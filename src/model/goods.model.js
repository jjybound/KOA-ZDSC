const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const goods = seq.define('zd_goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10,2), //十进制，二位小数
        allowNull: false,
        comment: '商家价格'
    },
    goods_num: {
        type: DataTypes.DECIMAL(10,2), //十进制，二位小数
        allowNull: false,
        comment: '商品货存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片'
    },
},{
    paranoid: true
}
);

// 如果数据库存在的话,加上force为true则会强制删除，直接用node启动，并且记得启动后删除这句话
//goods.sync({ force: true });

module.exports = goods;
