const { PORT_NUMBER } = require('./utils/constans.js')
const express = require('express')
const path = require('path')
const app = express()
const userRoute = require('./routes/user.js')

app.set('view engine', 'pug')
// 엔진을 pug로 설정한다.
app.set('views', path.join(`${__dirname}/../`, 'frontend'))
// pug 파일이 들어있는 곳을 설정한다. `현재경로/../frontend
app.use(express.static(path.join(`${__dirname}/../`, 'frontend')))
app.use('/', userRoute)

app.listen(PORT_NUMBER, () => {
  console.log(`Express server has started on port ${PORT_NUMBER}`)
})
