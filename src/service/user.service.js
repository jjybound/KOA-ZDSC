const User =require('../model/use.model')
class UserService {
    async createUser(user_name,password){

      const res =  User.create({ //前面是表名，就是和前面model里对应上的，后面是传递过来的值
            user_name:user_name,
            password:password})
       return res
    }
    async getUserInfo({id,user_name,password,is_admin}){
        const whereOpt = {}
        id && Object.assign(whereOpt,{id}) //如果id存在，就把id赋值给whereOpt，以此类推
        user_name && Object.assign(whereOpt,{user_name})
        password && Object.assign(whereOpt,{password})
        is_admin && Object.assign(whereOpt,{is_admin})

        const res = await User.findOne({
            attributes:['id','user_name','password','is_admin'],
            where:whereOpt
        })
        console.log('rrr',res)
        return res ? res.dataValues : null
    }
    async UserLogin ({user_name,password}){
        const res = await User.findOne({
            attributes:['id','user_name','password','is_admin'],
            where:{
                user_name,
            }
        })
        console.log(res)
        return res ? res.dataValues : null
    }
    async updateById ({id,user_name,password,is_admin}){
        const whereOpt= {id}
        const newUser= {}
        user_name && Object.assign(newUser,{user_name})
        password && Object.assign(newUser,{password})
        is_admin && Object.assign(newUser,{is_admin})

        const res = await User.update(newUser,{where:whereOpt})
        console.log(res)
        return res[0]>0 ?true:false
    }
}
module.exports = new UserService()