const Router = require('koa-router')
const router= new Router({prefix:'/goods'})
const {upload,createGoodsAPI,Updategoods,Deletegoods,resolvegoods,findAll}=require('../controller/goods.controller')
const {auth}=require('../middleware/auth.middleware')
const {goodsUserAdmin,validator}=require('../middleware/goods.middleware')
//上传图片
router.post('/upload',auth,goodsUserAdmin,upload)

//发布商品
router.post('/',auth,goodsUserAdmin,validator,createGoodsAPI)

//修改商品
router.post('/update',auth,goodsUserAdmin,validator,Updategoods)
//下架商品
router.get('/delete',auth,goodsUserAdmin,Deletegoods)
//上架商品
router.get('/resolve',auth,goodsUserAdmin,resolvegoods)
//获取商品列表
router.get('/Allgoods',findAll)
module.exports = router
