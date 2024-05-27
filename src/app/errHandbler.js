module.exports = (err,ctx)=>{
    let status=500
    switch(err.code){
        case '400':
            status = 400
            break
       case '403':
            status = 403
            break
        default:
            status= 500  
    }
    ctx.status=status
    ctx.body =err
}