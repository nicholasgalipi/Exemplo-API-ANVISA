const data = require('./preco_remedio_consumidor.json');

exports.add = (num1,num2) => {return num1+num2};

function normalizer(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]|[\W]/g, '').trim();
}

exports.getByName = (ctx) => { //get pelo nome comercial
    
    const regex = new RegExp(normalizer(ctx.params.name),"gi");
    //let filtered = data.filter( test => (normalizer(test['PRODUTO']).search(regex) >= 0));
    let filtered = data.filter( test => (regex.test(normalizer(test['PRODUTO'])) == true));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        ctx.body = {message: "Bad request"};
    }
    
}


exports.getByActive = (ctx) => { //get pelo nome do principio ativo
    
    const regex = new RegExp(normalizer(ctx.params.name),"gi");
    let filtered = data.filter( test => (regex.test(normalizer(test['SUBSTÂNCIA'])) == true));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        ctx.body = {message: "Bad request"};
    }
}





/*exports.getByName = (ctx) => { //get pelo nome comercial
    //console.log(ctx);
    let filtered = data.filter( test => (ctx.params.name == test['PRODUTO']));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        ctx.body = {message: "Not Found"};
    }
    
}

exports.getByActive = (ctx) => { //get pelo nome do principio ativo
    let filtered = data.filter( test => (ctx.params.name == test['SUBSTÂNCIA']));
    
    //response handling
    if(filtered.length > 0){
        ctx.body = filtered;
    }else{
        ctx.status = 404;
        ctx.body = {message: "Not Found"};
    }
    
}*/