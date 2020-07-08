const express = require('express')
const path = require('path')
const { mainRoute, userRoute } = require('./src/controllers')
const renderRoute = require('./src/routes')
const bodyParser = require('body-parser')
const app = express()
const { SERVER_PORT } = require('./src/utils/constants')

//pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))
app.use(express.static(path.join(__dirname, 'src/views')))
app.use(express.static('public')) // 상대경로 지정

app.use(bodyParser.json())

app.use(renderRoute) // serving pug
app.use('/', mainRoute)
app.use('/user', userRoute)

app.use((err, req, res, next) => {
  // 에러 처리 부분
  console.error(err.stack) // 에러 메시지 표시
  res.status(500).send('서버 에러!') // 500 상태 표시 후 에러 메시지 전송
})

app.listen(SERVER_PORT, () =>
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`)
)
