const seq = require('../db/seq')
const {DataTypes } = require('sequelize')
const OrderModel = seq.define('zd_orders',{
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址id'
    },
    goods_info: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品信息'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '订单总金额'
    },
    order_number: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '订单编号'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '订单状态,0未支付,1支付中,2支付成功,3支付取消,4已退款'
    }
})

/* OrderModel.sync({
    force: true
}) */
module.exports=OrderModel