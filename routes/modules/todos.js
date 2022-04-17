const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const UserId = req.user.id

  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



// view detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, userId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// post edited data
router.put('/:id', (req, res) => {

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