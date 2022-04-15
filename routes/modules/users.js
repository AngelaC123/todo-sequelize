const express = require('express')
const router = express.Router()


//register
// get page
router.get('/register', (req, res) => {
  res.render('register')
})

// post data to db
router.post('/register', (req, res) => {
  res.render('register')
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