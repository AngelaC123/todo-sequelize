const express = require('express')
const router = express.Router()

const db = require('../../models')

const Todo = db.Todo
const User = db.User


//register
// get page
router.get('/register', (req, res) => {
  res.render('register')
})

// post data to db
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})


//login
//get page
router.get('/login', (req, res) => {
  res.render('login')
})
//post data
router.post('/login', (req, res) => {
  res.render('login')
})


//logout
// get logout
router.get('/logout', (req, res) => {
  res.render('logout')
})


module.exports = router