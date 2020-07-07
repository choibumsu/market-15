const express = require('express')
const router = express.Router()

router.get('/join', (req, res) => {
  res.render('join-test')
})

router.get('/', (req, res) => {
  res.render('main-page')
})

module.exports = router
