const express = require('express')
const path = require('path')
const app = express()
const port = 3000

//pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static('public'))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
