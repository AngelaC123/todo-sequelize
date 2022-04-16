const express = require('express')
const router = express.Router()

const db = require('../models')

const users = require('./modules/users')
const home = require('./modules/home')


router.use('/',home)
router.use('/users', users)

module.exports = router


