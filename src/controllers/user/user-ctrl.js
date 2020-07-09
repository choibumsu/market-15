const { getUserOne, postRegister, verifyPassword } = require('../../model/user')

exports.postUserAuthController = async (req, res, next) => {
  try {
    const { id, password } = req.body
    const user = await getUserOne(id)
    if (!user) {
      res.status(404).json(false)
    }
    if (!(await verifyPassword(password, user.password, user.salt))) {
      res.status(403).json(false)
    }
    res.status(200).json({ name: user.name })
  } catch (e) {
    next(e)
  }
}

exports.postRegisterController = async (req, res, next) => {
  try {
    const result = await postRegister(req.body)
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
}

exports.getUserOneController = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await getUserOne(id)
    if (!user) {
      res.status(404).json(false)
    }
    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}

exports.postUserDuplicationController = async (req, res, next) => {
  try {
    const { id } = req.body
    const user = await getUserOne(id)
    if (user) {
      res.status(409).json()
      return
    }
    res.status(200).json()
  } catch (e) {
    next(e)
  }
}
