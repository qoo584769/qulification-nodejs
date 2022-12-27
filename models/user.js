const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    account: {
      type: String,
      required: [true, '帳號必填'],
    },
    password: {
      type: String,
      required: [true, '密碼必填'],
    },
    level: {
      type: String,
      required: true,
      enum: {
        values: ['nomal', 'admin'],
        message: '不接受 {VALUE}，僅接受 nomal, admin',
      },
      default: 'nomal',
    },
    likes: [
      {
        viewId: { type: String },
        title: { type: String },
        body: { type: String },
        pictureUrl: { type: String },
      },
      // {type:String}
    ],
  },
  {
    versionKey: false,
  }
)

const userModel = model('users', userSchema)
module.exports = userModel
