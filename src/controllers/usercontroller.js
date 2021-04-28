const validate = require('jsonschema').validate
const userSchema = require('../schema/userSchema')

function UserController (storage) {
  if (!new.target) {
    return new UserController(storage)
  }

  const _storage = storage

  this.add = async (data) => {
      
      const result = validate(data, userSchema)

      if (!result.valid) {
        throw new Error('invalid request body')
      }

      storage.insert('user', { email: data.email, rss: data.rss || [] })
  }

  this.remove = async (data) => {
      
      return _storage.remove('user', data)
  }

  this.find = async (email) => {
      
      return _storage.find('user', email)
  }
}

module.exports = UserController
