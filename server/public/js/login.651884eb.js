(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"322c":function(e,t,s){"use strict";var n=s("b623"),i=s.n(n);i.a},"35b0":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"login"}},[s("main",[s("section",[s("div",[s("h1",[e._v("管理员登录")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user,expression:"user"}],attrs:{type:"text",placeholder:"管理员登录名"},domProps:{value:e.user},on:{input:function(t){t.target.composing||(e.user=t.target.value)}}})]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.upwd,expression:"upwd"}],attrs:{type:"password",placeholder:"管理员登录密码"},domProps:{value:e.upwd},on:{input:function(t){t.target.composing||(e.upwd=t.target.value)}}})]),s("button",{on:{click:e.login}},[e._v("登录")])])])])])},i=[],o={data:function(){return{user:"",upwd:""}},methods:{login:function(){var e=this;""!=this.user&&""!=this.upwd?this.axios.post("index/api/admin/login",{user:this.user,upwd:this.upwd}).then((function(t){1==t.data.code?(e.$router.push("/admin/index"),e.$message({message:"登陆成功",type:"success"})):e.$message.error("账号或密码错误")})):this.$message.error("账号或密码不能为空")}}},r=o,u=(s("322c"),s("2877")),a=Object(u["a"])(r,n,i,!1,null,"b1010a00",null);t["default"]=a.exports},b623:function(e,t,s){}}]);
//# sourceMappingURL=login.651884eb.js.map