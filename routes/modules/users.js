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
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists!')
        return res.render('register', { name, email, password, confirmPassword })
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
  res.render('login')
})
//post data
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


//logout
// get logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router