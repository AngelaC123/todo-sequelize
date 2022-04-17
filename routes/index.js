const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const db = require('../models')
const users = require('./modules/users')
const home = require('./modules/home')
const todos = require('./modules/todos')
const auth = require('./modules/auth')

router.use('/auth', auth)
router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router


