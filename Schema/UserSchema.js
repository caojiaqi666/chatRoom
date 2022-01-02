const {Schema} = require('./config')



const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'user'
  },
  online: {
    type: Boolean,
    required: true,
  }
}, {
  versionKey: false,
})

module.exports = UserSchema
