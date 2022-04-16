const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// view detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, userId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// edit

// delete


module.exports = router