const { getUserInfo} =require('../service/user.service')
const bctypt = require('bcryptjs')
const {userFormarteError,userIsExited,useLoginErr} = require('../constant/error')
//注册判断逻辑
const Uservalidator=async (ctx,next)=>{
    const {user_name,password}=ctx.request.body
    //判断数据是否合法
    if(!user_name||!password){
        ctx.app.emit('error',userFormarteError,ctx)
        return
     }
     // 判断用户名是否被占用
     // 使用 await 等待异步方法返回结果
    if (await getUserInfo({ user_name })) {
        ctx.app.emit('error',userIsExited,ctx)
        return;
    }
     await next()
}

const crptypsw = async (ctx,next)=>{
    let {password} = ctx.request.body
    const salt = bctypt.genSaltSync(10)
    //hash保存密文
    const hash = bctypt.hashSync(password,salt)
    ctx.request.body.password=hash
    await next()
}
const solvepsw = async (ctx,next)=>{
    const { user_name, password } = ctx.request.body;
   const res =  await getUserInfo({ user_name})
   const truth = bctypt.compareSync(password,res.password)
   console.log('结果',truth)
   if(truth===false){
    ctx.app.emit('error',useLoginErr,ctx)
    return
   }else{
    await next()
   }
}
module.exports={
    Uservalidator,
    crptypsw,
    solvepsw
}