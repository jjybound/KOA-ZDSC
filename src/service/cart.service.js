const { Op } = require('sequelize')
const cartModel = require('../model/cart.model')
const GoodsModel = require('../model/goods.model')
class CartsService {
   async createOrUpdate(user_id,goods_id){
        let res = await cartModel.findOne({
           where:{
            [Op.and]:{ //Op操作符，意思是查询两者如果同时存在情况下，则返回true，然后让number+1
                user_id,
                goods_id,
               }
           }
        })
        if(res){
            //如果已经存在记录，则将number+1
           await res.increment('number')
           return await res.reload() //
        }else{

           return await cartModel.create({
                user_id,
                goods_id
            })
        }
       
   }
   async goodsBlack(goods_id){
       let res = await GoodsModel.findOne({
           where:{
               id:goods_id
           }
       })
       return res
   }
   async findCards(user_id,pageNum,pageSize){

   const {count,rows} = await cartModel.findAndCountAll({
        attributes:['id','number','selected'],//限制只查询这些固定参数
        where:{ //user_id要对应上
            user_id:user_id
        },
        offset:(pageNum-1)*pageSize,
        limit:pageSize *1,
        //在这里还需要导入进GoodsModel，并指定导出的字段
        include:[
            {
                model:GoodsModel,
                as:'goods_info',
                attributes:['id','goods_name','goods_price','goods_num','goods_img']
            }
        ],
    })
    return{
        pageNum,
        pageSize,
        total:count,
        list:rows
    }
   }
   async UpdateCarts({id,number,selected}){
   
const res = await cartModel.findByPk(id)//会先去寻找id
    
    if(!res) return null
    number!==undefined?res.number = number:null
    selected!==undefined?res.selected = selected:null
    return await res.save()
    }
    async deleteCartServer(ids) { 
        const res = await cartModel.destroy({
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        })
        return res
    }
    async seleteAllService(user_id) { 
        const res = await cartModel.update({
            selected:1
        },{
            where:{
                user_id
            }
        })
        return res
    }
    async unseleteAllService(user_id) { 
        const res = await cartModel.update({
            selected:0
        },{
            where:{
                user_id
            }
        })
        return res
    }
    async CountUserCartService(user_id) { 
       
        const res = await cartModel.sum('number', {
            where: {
                user_id
            }
        })
        return res
    }
}
module.exports = new CartsService()