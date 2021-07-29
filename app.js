const data = require('./preco_remedio_consumidor.json');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const logger = require('koa-logger');  
const json = require('koa-json');

//instancing classes
const app = new Koa();
const router = new KoaRouter({
    prefix: '/medicamento'
});

//configuration
app.use(logger((str) => { //logging middleware configuration
    console.log(str);
}))
app.use(json());
app.listen(8080, () => {console.log("Running!")});
app.use(router.routes());


 

//ROUTERS
router.get('/get_by_name/:name', async ctx => (await getByName(ctx)));                  //get pelo nome comercial
router.get('/get_by_active_ingredient/:name', async ctx => (await getByActive(ctx)));   //get pelo nome do principio ativo
router.get('/get_restriction/:name', async ctx => (await getRestriction(ctx)))//restrição hospitalar
//tarja
//codigo de barras
//codigo GGREM




//controllers

function getByName(ctx){ //get pelo nome comercial
    let filtered = data.filter( test => (ctx.params.name == test['PRODUTO']));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        this.body = {message: "Not Found"};
    }
    
}

function getByActive(ctx){ //get pelo nome do principio ativo
    let filtered = data.filter( test => (ctx.params.name == test['SUBSTÂNCIA']));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        this.body = {message: "Not Found"};
    }
    
}

function getRestriction(ctx){
    
}