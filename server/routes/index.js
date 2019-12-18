var express = require('express');
//引入连接池模块
const pool = require('../pool.js');
//引入sesstion模块 存储用户状态
const session = require("express-session");
var router = express.Router();

//配置session模块
router.use(session({
  secret: "128位字符串",//安全字符串
  resave: true,//请求时更新数据
  saveUninitialized: true//保存初始数据
}))
router.post("/api/admin/login",(req,res)=>{
  var user=req.body.user
  var upwd=req.body.upwd
  pool.query("select * from adminuser where user=? and upwd=?",[user,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      req.session.user=result[0].user
      res.send({code:1,msg:"欢迎管路员",result})
    }else{
      res.send({code:0,msg:"账号或密码错误"})
    }
  })
})
//查询是否登录
router.post("/api/admin/islogin",(req,res)=>{
  var user=req.session.user
  if(!user){
    res.send({code:0,msg:"未登录"})
  }else{
    res.send({code:1,msg:"已登录",user})
  }
})
// 退出登录
router.get("/api/admin/out", (req, res) => {
  var user = req.session.user;
  if (user != "") {
    req.session.user = "";
    res.send({ code: 1, msg: "退出登录成功" })
  }
})


// router.get("/chatweb",(req,res)=>{
//   pool.query("SELECT qid,title,subtitle,pv,likes FROM bk_web",(err,result)=>{
//     res.send(result)
//   })
// })
// router.get("/qid/chatweb",(req,res)=>{
//   pool.query("SELECT * FROM bk_web",(err,result)=>{
//     res.send(result)
//   })
// })
// 提交个人信息接口
router.post("/api/submit",(req,res)=>{
  var obj=req.body
  console.log(obj)
  pool.query("INSERT INTO userinfo set ?",[obj],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1})
    }else{
      res.send({code:-1})
    }
  })
})
router.post("/api/user/count",(req,res)=>{
  pool.query("SELECT COUNT(*)AS count FROM userinfo",(err,result)=>{
    if(result.length>0){
      res.send(result)
    }else{
      res.send(-1)
    }
    
  })
})
// 分页显示用户信息
router.post("/api/user",(req,res)=>{
  console.log(req.body)
  var page=(req.body.page-1)*10;
  var size=req.body.size
  pool.query("SELECT * FROM userinfo LIMIT ?,?",[page,size],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send(result)
    }else{
      res.send({code:-1})
    }
  })
});
// 删除指定用户
router.post("/api/user/del",(req,res)=>{
  var qid=req.body.qid
  pool.query("delete from userinfo where qid=?",[qid],(err,result)=>{
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:0,msg:"删除失败"})
    }
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
