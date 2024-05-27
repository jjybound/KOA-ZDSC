const {sequelize, Sequelize} = require('sequelize')

const {MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE} =require('../config/config.default')
const seq = new Sequelize(MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD,{
    host:MYSQL_HOST,
    dialect:'mysql',
})
//可测试判断数据库是否连接成功
/* seq.authenticate().then(()=>{
    console.log('数据库连接成功')
}).catch((err)=>{
    console.log('数据库连接失败',err)
})  */

module.exports = seq