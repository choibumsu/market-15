const {
  postUserAuthController,
  postRegisterController,
  getUserOneController,
} = require('./user-ctrl')
const express = require('express')
const router = express.Router()

router.post('/', postRegisterController)
router.get('/:id', getUserOneController)
router.post('/auth', postUserAuthController)

module.exports = router
