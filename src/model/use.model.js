const {DataTypes} = require('sequelize')
const seq= require('../db/seq')
//创建模型 实例化对象,对应的就是表名。里面就是字段名
const User = seq.define('zd_User',{
    //id会被sequelize自动创建
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        comment:'用户名'
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
       allowNull:false,
       defaultValue:0,
       comment:'是否管理员,0不是，1是'
   }
 })
//如果数据库存在的话,加上force为true则会强制删除，直接用node启动，并且记得启动后删除这句话
// User.sync({force:true})

 module.exports = User