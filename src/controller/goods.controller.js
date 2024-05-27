const {createGoods,updateGoods,deletegood,resolvegood,findgoods} = require('../service/goods.service')
const {updateGoodsError}=require('../constant/error')
class GoodsController{
    async upload(ctx,next){
        ctx.body='图片成功咯'
    }
    async createGoodsAPI(ctx,next){
        try {
            const {goods_name,goods_price,goods_num,goods_img} =ctx.request.body
        const res =  await createGoods(goods_name,goods_price,goods_num,goods_img)
        ctx.body={
            code:200,
            message:'创建商品成功',
            result:{
                id:res.id,
                goods_name:res.goods_name
            }
        }
        } catch (error) {
            console.log(error)
        }
        
    }
    async Updategoods(ctx,next){
        const {id,goods_name,goods_price,goods_num,goods_img} =ctx.request.body
        const res =  await updateGoods(id,goods_name,goods_price,goods_num,goods_img)
        if(res){
            ctx.body={
                code:200,
                message:'更新商品成功',
                result:{}
            }
        }else{
            ctx.app.emit('error',updateError,ctx)
        }
    }
    async Deletegoods(ctx,next){
        const {id} =ctx.request.query
        console.log(id)
        const  res = await deletegood(id)
        if(res){
            ctx.body={
                code:200,
                message:'下架商品成功',
                result:{}
            }
        }else{
            ctx.app.emit('error',updateGoodsError,ctx)
        }
    }
    async resolvegoods(ctx,next){
        const {id} =ctx.request.query
        const  res = await resolvegood(id)
        if(res){
            ctx.body={
                code:200,
                message:'上架商品成功',
                result:{}
            }
        }else{
            ctx.app.emit('error',updateGoodsError,ctx)
        }
    }
    async findAll(ctx,next){
        const {pageSize=1,pageNum=10} =ctx.request.query
        const res = await findgoods(pageSize,pageNum)
        ctx.body={
            code:200,
            message:'查询成功',
            result:res
        }
    }
}
module.exports=new GoodsController()