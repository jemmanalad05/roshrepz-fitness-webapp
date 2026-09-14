const express = require('express')
const router = express.Router()

let users = [];

router.get('/', (req,res) => {
    res.send("Users List:")
    console.log("You are in '/users'");
})

router.get('/new', (req,res) => {
    res.render("signup")
    
    console.log("You are in '/users/new'")
})

router.post('/signup', (req, res) => {
  users.push({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    password: req.body.password,
  });

  console.log(users);

  res.status(201).json({ message: 'Account created!' });
});


module.exports = router