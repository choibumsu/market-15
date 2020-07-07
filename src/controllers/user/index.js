const { postUserAuth, postUserDuplication } = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.post('/auth', postUserAuth)
router.post('/duplicatuon', postUserDuplication)

module.exports = router
