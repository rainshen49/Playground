const Koa = require('koa')
const app = new Koa()


app.use((ctx,next)=>{
    ctx.body = 'hello world'
    return next()
})

app.use((ctx,next)=>{
    console.log(`${ctx.method} ${ctx.url}`)
    ctx.throw(500,"sorry some exception occured")
})
app.on('error',(err,ctx)=>{
    console.log(err.message,ctx)
})

app.listen(3000)
console.log(app.callback().toString())