var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/bbsSql')

var db = mongoose.connection
db.on('error',(err)=>{
    console.log("数据库链接失败");
    
})
db.once('open',()=>{
    console.log('数据库链接成功');
    
})