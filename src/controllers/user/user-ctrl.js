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
      res.status(409).json()
      return
    }

    res.status(200).json()
  } catch (e) {
    // next(e)
    console.log(e)
    res.status(404).json()
  }
}
