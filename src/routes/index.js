const express = require('express')
const router = express.Router()

router.get('/join/:path', (req, res) => {
  const { path } = req.params
  if (path === 'success') {
    res.render('welcome-page')
  }
  res.render('join-test')
})

router.get('/join', (req, res) => {
  res.render('join-page')
})

router.get('/', (req, res) => {
  res.render('main-page')
})

module.exports = router
