const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const addrModel = seq.define('zd_addr', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人',
  },
phone:{
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人电话',
  },
address:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'收货地址'
    },
is_default:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false,
    comment:'是否默认地址'
}
}
)
//addrModel.sync({force:true})

module.exports = addrModel;