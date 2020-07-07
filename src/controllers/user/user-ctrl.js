const { userDB } = require('../../config/db')

exports.postUserAuth = (req, res, next) => {
  try {
    const { id, password } = req.body

    userDB.get(id, (err, value) => {
      if (err) {
        res.json(false)
        return
      }

      const user = value
      if (user.password !== password) {
        res.json(false)
        return
      }

      res.json({
        user: value,
      })
    })
  } catch (e) {
    next(e)
  }
}
