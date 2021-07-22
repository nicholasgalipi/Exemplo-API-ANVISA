const data = require('./preco_remedio_consumidor.json');
const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter({
    prefix: '/medicamento'
});

app.listen(8080);
app.use(router.routes());

//ctx.params.name
router.get('/get_by_name/:name', async ctx => (ctx.body = ctx.params.name));
