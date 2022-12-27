require('dotenv').config()
require('./DBConnection.js')()
const express = require('express')
const userRouter = require('./routers/auth')
const viewRouter = require('./routers/view')
const app = express()
const PORT = process.env.PORT || 5000

// 解析要放在路由前面才會經過
// bodypaser可以用在這邊全域 也可以放在router裡面
app.use(express.json())
// urlencoded是用來解析非網址列傳入的資料
app.use(express.urlencoded({ extended: true }))

// 本地端cors
app.use((req, res, next) => {
  res.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'PATCH, POST, GET,OPTIONS,DELETE')
  res.set('Content-Type', 'application/json')
  next()
})

app.use('/user', userRouter)
app.use('/view', viewRouter)

app.listen(PORT, () => {
  console.log('start success')
})
