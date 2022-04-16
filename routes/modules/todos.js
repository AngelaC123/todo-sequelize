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
// view edit page
router.get('/:id/edit', (req, res) => {
  // get user id, todo id
  // find data
  //render edit apge
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// post edited data
router.put('/:id', (req, res) => {
  // get data from input
  // save to the data

  const id = req.params.id
  const UserId = req.user.id
  const { isDone, name } = req.body

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})


// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.destroy()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router