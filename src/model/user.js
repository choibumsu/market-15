const db = require('../config/db')

exports.postRegister = async (options) => {
  try {
    const { id } = options
    const result = await db.put(id, options)
    console.log(result)
    return result
  } catch (e) {
    console.error(e)
  }
}

exports.getUserOne = async (id) => {
  try {
    return await db.get(id)
  } catch (e) {
    console.error(e)
    return null
  }
}
