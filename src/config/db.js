const level = require('level')
const subLevel = require('level-sublevel')

const db = subLevel(level('./db', { valueEncoding: 'json' }))

const userDB = db.sublevel('users')

module.exports = {
  userDB,
}
