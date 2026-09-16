const express = require('express')
const router = express.Router()
const pool = require("../config/database");
const bcrypt = require("bcrypt");

let users = [];

router.get('/', (req,res) => {
    res.send("Users List:")
    console.log("You are in '/users'");
})

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


module.exports = router