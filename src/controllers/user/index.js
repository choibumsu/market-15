const { getUserController } = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.get('/user', getUserController)

module.exports = router
