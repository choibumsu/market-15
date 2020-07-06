const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('main')
  // 해당 pug 파일을 전송한다.
})

router.get('/about', (req, res) => {
  // res.render('about')
})

module.exports = router
