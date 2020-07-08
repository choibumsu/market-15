const { postUserAuth, postUserDuplicationController } = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.post('/auth', postUserAuth)
router.post('/duplicatuon', postUserDuplicationController)

module.exports = router
