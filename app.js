var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//session模块
var session = require('express-session')
//连接数据库
var db = require('./db/connect')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 引入路由文件
var articleRouter = require('./routes/articles')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
//session配置
app.use(session({
  secret:'zhh',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:1000*3600*1} //指定cession有效时长,单位毫秒
}))
//用户登入拦截
app.get('*', (req, res, next)=>{
  let { username } = req.session
  let url = req.url
  console.log('----------------------', req.session.username, req.session.isLogin, url)
  if (url != '/login' && url != '/regist') {
    if (!username) {
      // 用户未登录
      res.redirect('/login')
    }
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
