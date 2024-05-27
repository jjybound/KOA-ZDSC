const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')
const { addrController,UserAddController,updateAddress,DeleteAddress,DefaultAddress}=require('../controller/addr.controller')
const router = new Router({ prefix: '/address' })
router.post('/', auth, validator({
    consignee:'string',
    phone: {type:'string',format:/^1[3456789]\d{9}$/},
    address:'string'
}), addrController)

//查询用户下的所有地址
router.get('/UserAddress', auth, UserAddController)

//修改用户下的地址
router.put('/:id', auth, updateAddress)

//删除用户地址
router.delete('/:id', auth, DeleteAddress)
//设默认地址
router.put('/default/:id', auth, DefaultAddress)
module.exports = router