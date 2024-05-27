const Router = require('koa-router');

const router = new Router({ prefix: '/orders' });
const { auth } = require('../middleware/auth.middleware');
const {create,getOrderList,update} = require('../controller/order.controller')
//提交订单  //最好还有个中间件validator测验类型
router.post('/', auth,create);
module.exports = router;
//根据订单状态获取列表
router.get('/order', auth, getOrderList);

//修改订单状态
router.post('/updateOrder', auth, update);