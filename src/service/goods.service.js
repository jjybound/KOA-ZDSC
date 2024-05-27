const Goods = require('../model/goods.model')
class GoodsService {
    async createGoods(goods_name,goods_price,goods_num,goods_img) {
        const goods =  Goods.create({ //前面是表名，就是和前面model里对应上的，后面是传递过来的值
            goods_name,
            goods_price,
            goods_num,
            goods_img
        })
       return goods
    }
    async updateGoods(id,goods_name,goods_price,goods_num,goods_img){
        
        const GoodsId ={id}
        const GoodsOpt={}
        goods_name && Object.assign(GoodsOpt,{goods_name})
        goods_price && Object.assign(GoodsOpt,{goods_price})
        goods_num && Object.assign(GoodsOpt,{goods_num})
        goods_img && Object.assign(GoodsOpt,{goods_img})
        
        console.log('商品参数',GoodsOpt)
        const res = await Goods.update(GoodsOpt,{where:GoodsId})
        console.log('rrr',res)
        return res[0]>0 ?true:false
    }
    async deletegood(id){
        const res = await Goods.destroy({where:{id}})
        console.log('删除提示',res)
        return res>0 ?true:false
    }
    async resolvegood(id){
        const res = await Goods.restore({where:{id}})
        console.log('上架提示',res)
        return res>0 ?true:false
    }
    async findgoods(pageSize,pageNum){
        //1个方法
       /*  //获取总数
        const count =await Goods.count()
        //获取分页数据
        const rows = await Goods.findAll({
            offset:(pageNum-1)*pageSize,
            limit:pageSize*1
        }) */

        //第二个个方法
        const {count,rows} = await Goods.findAndCountAll({
            offset:(pageNum-1)*pageSize,
            limit:pageSize*1
        })
        return {
            total:count,
            pageNum,
            pageSize,
            list:rows
        }
    }
}
module.exports = new GoodsService()