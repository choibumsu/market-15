const { postRegisterController, getUserOneController } = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.post('/', postRegisterController)
router.get('/:id', getUserOneController)

module.exports = router
