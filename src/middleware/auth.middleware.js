const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenexpirederr } = require('../constant/error');

const auth = async (ctx, next) => {
    try {
        const { authorization } = ctx.request.header;
        const token = authorization.replace('Bearer ', '');
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
        console.log(ctx.state.user)
        await next();
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                ctx.app.emit('error', tokenexpirederr, ctx);
                break;
            case 'JsonWebTokenError':
                ctx.app.emit('error', tokenexpirederr, ctx);
                break;
            default:
                ctx.app.emit('error', tokenexpirederr, ctx);
                break;
        }
    }
};

module.exports = {
    auth
};
