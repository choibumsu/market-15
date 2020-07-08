const level = require('level')
<<<<<<< HEAD
const db = level('./db', { valueEncoding: 'json' })

module.exports = {
  db,
}
=======

const db = level('./db', { valueEncoding: 'json' })

module.exports = db
>>>>>>> feature/19-sign-up-api
