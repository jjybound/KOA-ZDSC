const {addressError} = require('../constant/error')
const validator = (rules) => { 
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
           
        } catch (err) { 
            console.log(err)
            return ctx.app.emit('error',addressError,ctx)
        }
         await next()
    }
}
module.exports = {validator}