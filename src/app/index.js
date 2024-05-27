const path = require('path')

const Koa =require('koa');
const {koaBody} =require('koa-body')
const router = require('../router/index')
const parameter = require('koa-parameter')
const errHandbler =  require('./errHandbler')
const app = new Koa()


//中间件
app.use(koaBody({
    multipart:true,
    formidable:{
        //在这配置中不推荐使用相对路径，在option中的相对路径是相对process的cwd
        uploadDir:path.join(__dirname,'../upload'),
        keepExtensions: true,
    },
   parsedMethods:['POST','PUT','PATCH','DELETE']//规定这些值会去请求body内容
}))
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods())//会限制请求类型，只允许要求的请求来
//统一错误处理
app.on('error',errHandbler)
module.exports = app