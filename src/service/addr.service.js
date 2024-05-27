const addrModel  = require('../model/addr.model')
class AddressService {
    async addAddr(user_id,consignee, phone, address) { 
        const res = await addrModel.create(
            { user_id, consignee, phone, address },
        )
        return res
    }
    async UserAddr(user_id) { 
        console.log('用户id',user_id)
        const res = await addrModel.findAll(
            {
                where: { user_id },
                attributes: ['id', 'consignee', 'phone', 'address','is_default']
            },
        )
        return res
    }
    async updateAddrService(id, consignee, phone, address) { 
        console.log('id号',id)
        const res = await addrModel.update(
            { consignee,phone,address },
            { where: { id } },
        )
        return res
    }
    async DeleteAddr(id) { 
        const res = await addrModel.destroy(
            { where: { id } },
        )
        return res
    }
    async DefaultAddr(user_id,id) { 
        await addrModel.update(
            { is_default: 0 },
            { where: { user_id } },
        )
        const res = await addrModel.update(
            { is_default: 1 },
            { where: { id } },
        )
        return res;
    }
}
module.exports = new AddressService()