const { getUserOne } = require('../../model')

exports.postUserAuth = async (req, res, next) => {
  try {
    const { id, password } = req.body
    const user = await getUserOne(id)

    if (!user) {
      res.status(404).json(false)
      return
    }

    if (user.password !== password) {
      res.status(403).json(false)
      return
    }

    res.json({
      result: user,
    })
  } catch (e) {
    // next(e)
    console.log(e)
    res.status(404).json()
  }
}

exports.postUserDuplicationController = async (req, res, next) => {
  try {
    const { id } = req.body
    const user = await getUserOne(id)

    if (user) {
      res.json({
        result: 'disallow',
      })
      return
    }

    res.json({
      result: 'allow',
    })
  } catch (e) {
    // next(e)
    console.log(e)
    res.status(404).json()
  }
}
