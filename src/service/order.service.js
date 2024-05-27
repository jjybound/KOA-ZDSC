const OrderModel = require('../model/order.model');
class OrderService { 
    async createOrder(order) { 
        return await OrderModel.create(order);
    }
    async OrderList(pageNum, pageSize, status, user_id) { 
    let whereCondition = { user_id };
    if (status) {
        whereCondition.status = status;
    }
    console.log('情况',whereCondition)
    const { count, rows } = await OrderModel.findAndCountAll({
        offset: (pageNum - 1) * pageSize, 
        limit: pageSize * 1, 
        attributes:["id","user_id","address_id","goods_info","total","order_number","status"],
        where: whereCondition
    });

    return { 
        pageNum, 
        pageSize, 
        total: count, 
        list: rows
    };
}
    async updateOrder(id,status) { 
        return await OrderModel.update({status}, { where: {id } });
    }
}
module.exports = new OrderService();