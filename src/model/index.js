const { db } = require('../config/db')

exports.getUserOne = async (id) => {
  try {
    const user = await db.get(id)

    return user
  } catch (e) {
    console.log(e)

    return null
  }
}
