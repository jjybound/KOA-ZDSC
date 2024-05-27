const {NotAdminPermission}=require('../constant/error')
const goodsUserAdmin = async (ctx,next)=>{
    try{
        const {is_admin} = ctx.state.user
        if(is_admin){
            await next()
        }else{
            ctx.app.emit('error',NotAdminPermission,ctx)
        }
    }catch(error){
        ctx.body={
            code:500,
            message:'服务器错误'
    }
}
}
//校验规则，需要现在app里面使用parameter
const validator = async(ctx,next)=>{
    try {
        ctx.verifyParams({
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',require:true},
            goods_num:{type:'number',require:true},
            goods_img:{type:'string',require:false}
        })
    } catch (error) {
        console.log(error)
    }
    await next()
}
module.exports={
    goodsUserAdmin,
    validator
}