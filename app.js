const data = require('./preco_remedio_consumidor.json');
const Controllers = require('./Controllers');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const logger = require('koa-logger');  
const json = require('koa-json');


//instancing classes
const app = new Koa();
const router = new KoaRouter();

//configuration
app.use(logger((str) => { //logging middleware configuration
    console.log(str);
}))
app.use(json());
app.listen(8080, () => {console.log("Running!")});
app.use(router.routes());
//empty request handler
app.use(function (ctx) {
    ctx.body = {
        message: "Bad request"
    }
    ctx.status = 404
});


 

//ROUTERS
router.get('/get_by_product_name', async ctx => (await Controllers.getByName(ctx)));                  //get pelo nome comercial
router.get('/get_by_active_ingredient', async ctx => (await Controllers.getByActive(ctx)));           //get pelo nome do principio ativo







//restrição hospitalar
//tarja
//codigo de barras
//codigo GGREM





