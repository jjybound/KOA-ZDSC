const {createUser,UserLogin,updateById} =require('../service/user.service')
const {useRegisterErr,updateError}=require('../constant/error')
const jwt =require('jsonwebtoken')
const {JWT_SECRET}=require('../config/config.default')
class UserController{
    async register(ctx,next){
        //1封装了中间件，在middleware中
       const {user_name,password}=ctx.request.body
       
       //2操作数据库
       try {
        const res =await createUser(user_name,password)
        ctx.body = {
         code:200,
         message:'注册成功',
         result:{
             id:res.id,
             user_name:res.user_name
         }
        }
       } catch (error) {
            ctx.app.emit('error',useRegisterErr,ctx)
       }
      
       //3返回结果
    }
    async login(ctx,next){
        try {
            const {user_name} = ctx.request.body
        const LoginResult = await UserLogin({user_name})
        const {password,...resUser}=LoginResult
        if(LoginResult){
            ctx.body = {
                code:200,
                message:'登录成功',
                result:{
                    token:jwt.sign(resUser,JWT_SECRET,{expiresIn:'1d'})
                }
            }
            ctx.status = 200
        }
        } catch (error) {
            console.log('出错',error)
        }
        

    }
    async updatepassword(ctx,next){
        const  id =ctx.state.user.id
        const password = ctx.request.body.password
        console.log('id',id)
        console.log('密码',password)
        const res =  await updateById({id,password})
        console.log(res)
        if(res){
            ctx.body = {
                code:200,
                message:'修改成功',
                result:''
            }
        }else{
            ctx.app.emit('error',updateError,ctx)
        }
    }
}

module.exports = new UserController()