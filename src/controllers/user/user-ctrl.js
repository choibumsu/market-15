const { getUserOne } = require('../../model')

exports.postUserAuth = async (req, res, next) => {
  try {
    const { id, password } = req.body
    const user = await getUserOne(id)

    if (user === false) {
      res.json(false)
      return
    }

    if (user.password !== password) {
      res.json(false)
      return
    }

    res.json({
      result: user,
    })
  } catch (e) {
    next(e)
  }
}
