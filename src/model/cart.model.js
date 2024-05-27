const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
//关联数据库，要根据商品的id去查找对应的商品内容
const GoodsModel = require('./goods.model')
const cartModel = seq.define('zd_cart', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品id',
  },
number:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量',
  },
selected:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否选中',
}
}
)
//cartModel.sync({force:true})
//关联数据库
cartModel.belongsTo(GoodsModel, //根据goods_id来判断商品，
  {foreignKey:'goods_id',
  as:'goods_info',//as是指定接口的名称,需要在service中对应
  })
module.exports = cartModel;