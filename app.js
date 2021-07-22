const data = require('./preco_remedio_consumidor.json');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const logger = require('koa-logger');  


const app = new Koa();
const router = new KoaRouter({
    prefix: '/medicamento'
});

app.use(logger((str, args) => {
    console.log(str, args);
}))
app.listen(8080);
app.use(router.routes());


 

//ROUTERS
//router.get('/get_by_name/:name', async ctx => (ctx.body = ctx.params.name));
router.get('/get_by_name/:name', async ctx => (await getByName(ctx)));





//controllers
function getByName(ctx){
    
    for (let index = 0; index < data.length; index++) {
        if(ctx.params.name == data[index]['SUBSTÂNCIA']){
            ctx.body = data[index];
            break;
        }
        
    }
}

