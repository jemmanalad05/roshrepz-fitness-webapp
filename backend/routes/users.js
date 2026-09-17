const express = require('express')
const router = express.Router()

// Configuring the database information.
const pool = require("../config/database");

// Hashing the passwords.
const bcrypt = require("bcrypt");

// Adding tokens for logged in Users.
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/requireAuth");

router.get('/', (req,res) => {
    res.send("Users List:")
    console.log("You are in '/users'");
})

router.get("/me", requireAuth, async (req, res) => {
  const [rows] = await pool.execute(
    `SELECT id, first_name, last_name, email
     FROM users
     WHERE id = ?`,
    [req.userId]
  );

  if (!rows[0]) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({ user: rows[0] });
});

router.get('/new', (req,res) => {
    res.render("signup")
    
    console.log("You are in '/users/new'")
})

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    confirmPassword,
  } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users
        (first_name, last_name, date_of_birth, email, password_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, dateOfBirth, email, passwordHash]
    );

    res.status(201).json({
      message: "Account created!",
      userId: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email is already registered." });
    }

    console.error(error);
    res.status(500).json({ message: "Could not create account." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name, email, password_hash
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email]
    );

    const user = rows[0];

    // User email does not exist
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // bcrypt compares the typed password with the hashed database password
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    // Password does not match
    if (!passwordMatches) {
    return res.status(401).json({
        message: "Invalid email or password.",
    });
    }

    // Password is correct: create the JWT here
    const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h",
        issuer: "roshrepz",
        algorithm: "HS256",
    }
    );

    // Email and password are both correct
    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Could not log in. Please try again.",
        });
    }
});


module.exports = router