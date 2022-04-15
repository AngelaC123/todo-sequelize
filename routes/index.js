const express = require('express')
const router = express.Router()

const users = require('./modules/users')

router.use('/users', users)

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router


