const UserSchema = require('../Schema/UserSchema.js')
const {db} = require('../Schema/config.js')

const UserModel = db.model("online", UserSchema)

// let admin = new UserModel({
//   username: "admin",
//   passwd: "admin",
//   online: true,
//   type: 'system'
// })
// admin.save().then((r) => {
//   console.log(r);
// })

module.exports = UserModel
