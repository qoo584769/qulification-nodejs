const userModle = require('../models/user')
const { verifyToken } = require('../utils/verification')

const isAuth = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // 沒token
  if (!token) {
    return res.status(400).json({
      message: 'token不存在',
    })
  }

  // 從token取得id
  const verify = await verifyToken(token)
  if (verify) {
    const result = await userModle.findOne(
      { _id: verify },
      '_id account password'
    )

    if (!result) {
      return res.status(400).json({
        message: '有token找不到ID',
      })
    }

    req.user = result
    next()
  } else {
    return res.status(400).json({
      message: '沒token或資料庫查詢不到',
    })
  }
}
module.exports = { isAuth }
