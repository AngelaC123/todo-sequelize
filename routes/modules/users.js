const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

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

  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Name, Email, Password and Confrim Password are all required!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password do not match!' })
  }
  if (errors.length !== 0) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        errors.push({
          message: 'This email has already registered!'
        })
        return res.render('register', { name, email, password, confirmPassword, errors })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(user => res.redirect('/'))
        .catch(error => console.log(error))
    })
})


//login
//get page
router.get('/login', (req, res) => {
  req.flash('warning_msg')
  res.render('login')
})
//post data
router.post('/login', (req, res, next) => {

  const { password, email } = req.body
  if (!email || !password) {

    return res.render('login', { email, password, error: "Email and Password are all required!" })
  }
  next()
}
  , passport.authenticate('local', {
    // failureMessage: true,
    failureFlash: true,
    failureRedirect: '/users/login'
  }), (req, res) => {
    res.redirect('/')
  })


//logout
// get logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have logout successfully!')
  res.redirect('/users/login')
})


module.exports = router