const {addAddr,UserAddr,updateAddrService,DeleteAddr,DefaultAddr} =require('../service/addr.service')
class AddrController {
    async addrController(ctx, next) { 
        const { consignee, phone, address } = ctx.request.body
        const user_id = ctx.state.user.id
        const res = await addAddr(user_id,consignee, phone, address)
        ctx.body = {
            code: 200,
            message: '添加地址成功',
            result: res
        }
    }
    async UserAddController(ctx, next) { 
        const user_id = ctx.state.user.id
        const res = await UserAddr(user_id)
        ctx.body = {
            code: 200,
            message: '查询地址成功',
            result: res
        }
    }
    async updateAddress(ctx, next) { 
        const { id } = ctx.request.params
        const { consignee, phone, address } = ctx.request.body
        const res = await updateAddrService(id,consignee,phone,address)
        ctx.body = {
            code: 200,
            message: '修改地址成功',
            result: res
        }

    }
    async DeleteAddress(ctx, next) { 
        const { id } = ctx.request.params
        const res = await DeleteAddr(id)
        ctx.body = {
            code: 200,
            message: '删除地址成功',
            result: res
        }
    }
    async DefaultAddress(ctx, next) { 
        const { id } = ctx.request.params
        const user_id = ctx.state.user.id
        const res = await DefaultAddr(user_id,id)
        ctx.body = {
            code: 200,
            message: '设置默认地址成功',
            result: res
        }
    }
}
module.exports = new AddrController()