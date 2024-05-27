const Router = require('koa-router')
const router = new Router({prefix:'/carts'})
const {auth}=require('../middleware/auth.middleware')
const {validator,Isblack} = require('../middleware/cart.middleware')
const {add,findUserCart,update,deleteCart,seleteAll,unseleteAll,CountUserCart} =require('../controller/cart.controller')



//添加购物车
router.post('/',auth,validator({goods_id:'number'}),Isblack,add)

//获取用户的购物车列表
router.get('/Usercart',auth,findUserCart)
//更新购物车
router.patch('/:id',auth,validator(
    {
        number:{type:'number',required:false},
        selected:{type:'boolean',required:false}
    }), update)
//删除购物车 //用delete的话，默认是不会去请求body里面的内容，需要在app.use增加
router.delete('/delete', auth, validator({ ids: 'array' }), deleteCart)

//全选
router.get('/seleteAll',auth, seleteAll)
//全不选
router.get('/unseleteAll', auth, unseleteAll)
//获取当前用户下的商品总数
router.get('/getTotal',auth,CountUserCart)
module.exports = router