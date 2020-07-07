const express = require('express')
const path = require('path')
const { mainPageRoute, userPageRoute } = require('./src/controllers')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const { SERVER_PORT } = require('./src/utils/constants')

//pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

//public path setting
app.use(express.static(path.join(__dirname, 'src/views')))
app.use(express.static('public'))

app.use(bodyParser.json())

//session
app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

app.use('/', mainPageRoute)
app.use('/user', userPageRoute)

app.listen(SERVER_PORT, () =>
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`)
)
