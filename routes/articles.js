var express = require('express');
var router = express.Router();
var articleModel = require('../db/articleModel')
var multiparty = require('multiparty')
var fs = require('fs')

var form = new multiparty.Form()

/* 首页路由 */
router.post('/write', (req, res, next)=>{
  let { title, content } = req.body
  let createTime = Date.now()
  let username = 'zhh'
  // 插入数据库
  articleModel.insertMany({title, content, createTime, username}).then((data)=>{
    // 入库成功
    // res.send('文章发表成功')
    res.redirect('/')
  }).catch((err)=>{
    // res.send('文章发表失败')
    res.redirect('/write')
  })
  // res.send({title, content})
})

router.post('/upload', (req, res, next)=>{
  form.parse(req, (err, field, files) =>{
    if (err) {
      console.log('文件上传失败')
    } else {
      var file = files.filedata[0]
      // 读取流
      var read = fs.createReadStream(file.path)
      // 写入流
      var write = fs.createWriteStream('./public/images/'+file.originalFilename)
      // 管道流，图片写入指定目录
      read.pipe(write)
      write.on('close', ()=>{
        res.send({err: 0, msg: '/images/'+file.originalFilename})
      })
    }
  })
})

module.exports = router;
