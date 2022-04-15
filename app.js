const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()
const PORT = 3000

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`express is now listening on http://localhost:${PORT}`)
})