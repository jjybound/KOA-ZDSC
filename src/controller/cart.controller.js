const {createOrUpdate,findCards,UpdateCarts,deleteCartServer,seleteAllService,unseleteAllService,CountUserCartService} = require('../service/cart.service')
const {GoodsError} = require('../constant/error')
class CartController{
    async add(ctx,next){
      //将商品添加进购物车，需要用户id和产品id
      const user_id=ctx.state.user.id
      const {goods_id}=ctx.request.body
      console.log('用户',user_id)
      console.log('商品',goods_id)
      //操作数据库
      const res = await createOrUpdate(user_id,goods_id)
      console.log('yes')
      ctx.body={
        code:200,
        message:'添加成功',
        result:res
      }
    }
    async findUserCart(ctx,next){
      const user_id = ctx.state.user.id
      const {pageNum=1,pageSize=10} = ctx.request.query
      const res = await findCards(user_id,pageNum,pageSize)
      ctx.body={
        code:200,
        message:'获取购物车成功',
        result:res
      }
    }
    async update(ctx,next){
      const {id} = ctx.request.params
      const {number,selected} = ctx.request.body
      if(number === undefined && selected === undefined){
        GoodsError.message = 'number和selected不能同时为空'
        return ctx.app.emit('error',GoodsError,ctx)
      }
      const res = await UpdateCarts({id,number,selected})
      if(res===null){
        GoodsError.message = '无此id'
        return ctx.app.emit('error',GoodsError,ctx)
      }
      ctx.body={
        code:200,
        message:'更新购物车成功',
        result:res
      }
  }
  async deleteCart(ctx, next) {
    const { ids } = ctx.request.body
    const res = await deleteCartServer(ids)
    ctx.body = {
      code: 200,
      message: '删除购物车成功',
      result: res,
    }
  }
  async seleteAll(ctx, next) { 
        const user_id = ctx.state.user.id
        const res = await seleteAllService(user_id)
        ctx.body = {
            code: 200,
            message: '全选成功',
            result: res
        }
    }
    async unseleteAll(ctx, next) { 
        const user_id = ctx.state.user.id
        const res = await unseleteAllService(user_id)
        ctx.body = {
            code: 200,
            message: '全不选成功',
            result: res
        }
  }
  async CountUserCart(ctx, next) { 
    const user_id = ctx.state.user.id
    const res = await CountUserCartService(user_id)
    ctx.body = {
        code: 200,
        message: '获取购物车数量成功',
        result: res
    }
  }
}
module.exports = new CartController()