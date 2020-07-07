const { postUserAuth } = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.post('/auth', postUserAuth)

module.exports = router
