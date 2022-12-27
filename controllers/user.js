const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

//註冊
const signup = async (req, res) => {
  const { account, password } = req.body
  const userData = {
    account,
    password,
  }

  if (!userData.account || !userData.password) {
    return res.status(400).json({
      message: '帳號密碼為必填項目',
    })
  }

  userModel
    .findOne({ account: userData.account }, '_id account password')
    .exec((findErr, findRes) => {
      if (findErr) {
        return res.status(400).json({ message: '註冊帳號查詢錯誤' })
      }

      if (findRes !== null) {
        return res.status(400).json({ message: '帳號已存在' })
      }
    })

  const createRes = await userModel.create(userData)

  return res.status(200).json({
    message: 'success',
    account: createRes.account,
    password: createRes.password,
  })
}

// 登入
const signin = async (req, res) => {
  const { account, password } = req.body
  const userData = {
    account,
    password,
  }

  if (!userData.account || !userData.password) {
    return res.status(400).json({
      message: '帳號密碼為必填項目',
    })
  }

  userModel
    .findOne({ account: userData.account, password: userData.password })
    .exec((findErr, findRes) => {
      if (findErr) {
        console.log(findErr)
        return res.status(400).json({ message: '會員登入資料庫發生錯誤' })
      }
      if (findRes === null) {
        return res.status(400).json({ message: '會員帳號密碼錯誤' })
      }

      const token = jwt.sign(
        {
          id: findRes._id,
        },
        process.env.SECRET,
        {
          algorithm: 'HS256',
          expiresIn: process.env.EXPIRES_IN,
        }
      )

      return res.status(200).json({
        message: '登入成功',
        user: findRes,
        token,
      })
    })
}

module.exports = { signup, signin }
