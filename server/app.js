var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//解决history模式跳转路径找不到页面  connect-history-api-fallback中间件
var history=require('connect-history-api-fallback')
//引入body-parser中间件
const bodyParser = require('body-parser');
//CORS跨域
const cors = require('cors')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/file');

var app = express();
//使用body-parser中间件，将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors({
    //允许跨域url列表
    origin: ["http://127.0.0.1:80","http://192.168.0.3:8080"],
    credentials: true//每次请求需要验证
}))
////connect-history-api-fallback中间件  配置
app.use(history())
app.use(express.static(path.join(__dirname,'../client/dist')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileRouter);


module.exports = app;
