// 引入编写好的api
const api = require('./api')
// 引入文件模块
const fs = require('fs')
// 引入处理路径的模块
const path = require('path')
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express')
const app = express()

// {limit: '50mb'}可以解决传输大文件报413的错误
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(api)
// 访问静态资源文件 这里是访问所有public目录下的静态资源文件
app.use(express.static('public'))
// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function(req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
// })
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
// 返回/public/images下图片
app.get('/public/images/*', function(req, res) {
  res.sendFile( __dirname + '/' + req.url)
})
// 监听8088端口
app.listen(8088)
console.log('success listen…………')