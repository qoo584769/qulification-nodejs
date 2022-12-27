const jwt = require('jsonwebtoken')

// 驗證token是否到期
const verifyToken = (token) => {
  let result = ''
  console.log('驗證token', token)

  //   取得現在時間 秒為單位
  const time = Math.floor(Date.now() / 1000)

  return new Promise((resolve, reject) => {
    // 使用jwt套件判斷是否到期
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          result = false
          resolve(result)
        } else if (decoded.exp <= time) {
          result = false
          resolve(result)
        } else {
          result = decoded.id
          resolve(result)
        }
      })
    } else {
      resolve(false)
    }
  })
}

module.exports = { verifyToken }
