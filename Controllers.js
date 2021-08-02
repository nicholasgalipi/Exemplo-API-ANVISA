const data = require('./preco_remedio_consumidor.json');

exports.add = (num1,num2) => {return num1+num2};


exports.getByName = (ctx) => { //get pelo nome comercial
    //console.log(ctx);
    let filtered = data.filter( test => (ctx.params.name == test['PRODUTO']));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        this.body = {message: "Not Found"};
    }
    
}

exports.getByActive = (ctx) => { //get pelo nome do principio ativo
    let filtered = data.filter( test => (ctx.params.name == test['SUBSTÂNCIA']));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        this.body = {message: "Not Found"};
    }
    
}