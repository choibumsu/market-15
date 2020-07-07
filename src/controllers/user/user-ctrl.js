const { postRegister, getUserOne } = require('../../model/user')

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
    console.log('id', id)
    const user = await getUserOne(id)
    if (!user) {
      res.status(404).json()
    }
    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}
