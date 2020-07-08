const express = require('express')
const router = express.Router()

router.get('/join/test', (req, res) => {
  res.render('join-test')
})

router.get('/join', (req, res) => {
  res.render('join-page')
})

router.get('/', (req, res) => {
  res.render('main-page')
})

module.exports = router
