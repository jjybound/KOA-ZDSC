const {createOrder,OrderList,updateOrder} = require('../service/order.service')
class OrderController { 
    async create(ctx, next) { 
        const user_id = ctx.state.user.id
        const { address_id, goods_info, total } = ctx.request.body
        const order_number = 'JJY' + new Date().getTime()
        const res = await createOrder({
            user_id, address_id, order_number, goods_info, total
        })
        ctx.body = {
            code:200,
            message:'创建订单成功',
            data:res
        }
    }
    async getOrderList(ctx, next) { 
        const user_id = ctx.state.user.id
        const { pageNum = 1, pageSize = 10,status } = ctx.request.query
        const res = await OrderList(
            pageNum, pageSize,status,user_id
        )
        ctx.body = {
            code:200,
            message:'获取订单列表成功',
            data:res
        }
    }
    async update(ctx, next) { 
        const { id, status } = ctx.request.body
        const res = await updateOrder(id,status)
        ctx.body = {
            code:200,
            message:'更新订单状态成功',
            data:res
        }
    }
}
module.exports = new OrderController()