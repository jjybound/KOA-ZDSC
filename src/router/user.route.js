const Router = require('koa-router');
const {Uservalidator,crptypsw,solvepsw} = require('../middleware/user.middleware')
const {register,login,updatepassword} = require('../controller/user.controller');
const {auth}=require('../middleware/auth.middleware')
const router = new Router({prefix:'/users'});
//注册接口
router.post('/register',Uservalidator,crptypsw,register) //先走中间件，再走注册逻辑
//登录接口
router.post('/login',solvepsw,login)
//获取用户信息
router.get('/user',auth,(ctx,next)=>{
   ctx.status=200
   ctx.body={
     code:200,
     message:'获取用户信息成功',
     result:ctx.state.user
   }
})

router.patch('/',auth,crptypsw,updatepassword)
module.exports = router