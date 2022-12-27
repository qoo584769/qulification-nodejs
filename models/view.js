const { Schema, model } = require('mongoose')

const viewSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, '標題必填'],
    },
    body: {
      type: String,
      require: [true, '內容必填'],
    },
    pictureUrl: {
      type: String,
      require: [true, '圖片網址必填'],
    },
    userId: {
      type: String,
    },
  },
  { versionKey: false }
)

const viewModel = model('views', viewSchema)

module.exports = viewModel
