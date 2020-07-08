const express = require('express')
const path = require('path')
const { mainPageRoute, userPageRoute } = require('./src/controllers')
const bodyParser = require('body-parser')
const app = express()
const { SERVER_PORT } = require('./src/utils/constants')

//pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static(path.join(__dirname, 'src/views')))

app.use(bodyParser.json())
app.use('/', mainPageRoute)
app.use('/user', userPageRoute)
app.use('/static', express.static(__dirname + '/public'))

app.listen(SERVER_PORT, () =>
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`)
)
