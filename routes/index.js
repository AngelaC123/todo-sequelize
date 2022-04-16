const express = require('express')
const router = express.Router()

const db = require('../models')

const users = require('./modules/users')
const home = require('./modules/home')
const todos = require('./modules/todos')


router.use('/', home)
router.use('/users', users)
router.use('/todos', todos)

module.exports = router


