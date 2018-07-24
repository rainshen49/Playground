const Koa = require('koa');
const { PassThrough } = require('stream')
const app = new Koa();
const runacorn = require('./acorn').run
app.use(async ctx => {
    if(!ctx.path.includes('favicon')){
        const statusstream = new PassThrough();
        ctx.type = 'text/html'
        ctx.body = statusstream;
        statusstream.push('抢课中。。。失败的话，刷新再抢\n');
        await runacorn(statusstream.push.bind(statusstream)).catch(e => statusstream.push(e.message))
        statusstream.push(null);
    }
});

console.log('goto localhost:3000')
app.listen(3000);