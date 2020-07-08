const { getUserOne } = require('../../model')

exports.postUserAuth = async (req, res, next) => {
  try {
    const { id, password } = req.body
    const user = await getUserOne(id)

    if (req.session.userId) {
      console.log(req.session.userId)
    }

    if (!user) {
      res.status(404).json(false)
      return
    }

    if (user.password !== password) {
      res.status(403).json(false)
      return
    }

    req.session.userId = id
    res.json({
      result: user,
    })
  } catch (e) {
    // next(e)
    console.log(e)
    res.status(404).json()
  }
}

exports.test = (req, res) => {
  res.render('test')
}
