const { postUserAuth, test } = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.get('/test', test)
router.post('/auth', postUserAuth)

module.exports = router
