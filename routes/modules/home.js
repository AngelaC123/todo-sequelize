const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {

  return User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        raw: true,
        next: true,
        where: { UserId: req.user.id }
      })
    })

    .then(todos => res.render('index', { todos: todos }))
    .catch(error => res.status(422).json(error))
})

module.exports = router