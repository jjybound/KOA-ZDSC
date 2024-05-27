const { GoodsError,BlackError } = require('../constant/error');
const {goodsBlack} =require('../service/cart.service')
const validator =(rules)=>{
  return  async(ctx,next)=>{
        try {
            ctx.verifyParams(rules)
        } catch (error) {
            console.log(error)
            GoodsError.result=error
            return ctx.app.emit('error',GoodsError,ctx)
        }
        await next()
    }
}
const Isblack=async(ctx,next)=>{
    const {goods_id}=ctx.request.body
    const res = await goodsBlack(goods_id)
    if(res){
      await next()
    }else{
       return ctx.app.emit('error',BlackError,ctx)
    }
}


module.exports = {validator,Isblack}