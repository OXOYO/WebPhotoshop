"use strict"
const models = require('./db')
const express = require('express')
const fs = require('fs')
const router = express.Router()

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount',(req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models.Login({
    name : req.body.name,
    password : req.body.password,
    imgUrl: []
  })
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('createAccount successed')
    }
  })
})
// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {
  let account = {
    name: req.body.name,
    password : req.body.password
  }
  // 通过模型去查找数据库
  models.Login.find(account, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
// 接受上传图片
router.post('/api/upload', (req, res) => {
  // 接收前台POST过来的base64
  let id = req.body.id
  let name = req.body.name
  let imgData = req.body.img
  // 图片存储路径
  let path = 'public/images/'+ name
  // 过滤data:URL
  let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
  // 把base64码转成buffer对象
  let dataBuffer = new Buffer(base64Data, 'base64')
  // 用fs写入文件
  fs.writeFile(path, dataBuffer, function(err) {
    if(err){
      res.send(err)
    }else{
      let url = 'http://localhost:8088/' + path
      // 将图片地址存入数据库
      models.Login.update({'_id': id}, {$push: {imgUrl: url}}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
      // 写入成功
      res.send('writeFile successed')
    }
  })
})

module.exports = router