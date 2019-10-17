var express = require('express');
var router = express.Router();
var userModel = require('../db/userModel')
/* GET users listing. */
router.get('/getUsersList', function(req, res, next) {
console.log('有请求来了');

userModel.find().then((docs)=>{
  console.log('查询成功',docs)
  res.send({err:0,msg:'success',data:docs})
  
}).catch((err)=>{
  console.log("查询失败",err)
  res.send({err:-1,msg:'fail'})
  
})

  // res.send('hello world');
});

//注册接口
router.post('/regist',(req,res,next)=>{
  //接收post数据
  let{username,password,password2}=req.body
  //数据校验工作,在这里完成
  //查询是否存在这个用户
  userModel.find({username}).then((docs)=>{
if(docs.length>0){
  res.send('用户名已存在')
}else{
  //开始注册
  let createTime=Date.now()
  //插入数据
  userModel.insertMany({username,password,createTime}).then((data)=>{
    //res.send('注册成功)
    res.redirect('/login')
  }).catch((err)=>{
    //res.send('注册失败)
    res.redirect('./regist')
  })
}
  })
})

//登入接口
router.post('/login',(req,res,next)=>{
  //接收post数据
  let{username,password}=req.body
  //操作数据库
  userModel.find({username,password}).then((docs)=>{
if(docs.length>0){
  // res.send('登入成功')
  res.redirect('/')
}else{
 //res.send('用户名不存在)
 res.redirect('/login')}
  }).catch((err)=>{
    //res.send('登入失败)
    res.redirect('./login')
  })

})


module.exports = router;
