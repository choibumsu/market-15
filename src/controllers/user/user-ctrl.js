const { getUserOne, postRegister } = require('../../model')

exports.postUserAuthController = async (req, res, next) => {
  try {
    const { id, password } = req.body
    const user = await getUserOne(id)

    if (!user) {
      res.status(404).json(false)
    }

    if (user.password !== password) {
      res.status(403).json(false)
    }

    res.json({
      result: user,
    })
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
      res.status(404).json()
    }
    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}
