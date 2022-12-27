const mongoose = require('mongoose')

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

const connection = async () => {
  try {
    await mongoose.connect(DB)
    console.log('資料庫連線成功')
  } catch (error) {
    console.log('資料庫連線失敗', error)
  }
}

module.exports = connection
