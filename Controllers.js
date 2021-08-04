const data = require('./preco_remedio_consumidor.json');

exports.add = (num1,num2) => {return num1+num2};

function normalizer(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]|[\W]/g, '').trim();
}

exports.getByName = (ctx) => { //get pelo nome comercial
   
    const querry = normalizer(ctx.query.name);
    
    if(querry.length == 0){
        ctx.status = 404
        ctx.body = {message: "Empty request"};
    }else{
        const regex = new RegExp((querry),"gi");
        let filtered = data.filter( test => (regex.test(normalizer(test['PRODUTO'])) == true));
        
        //response handling
        if(filtered.length > 0){
            ctx.body = filtered;
        }else{
            ctx.status = 404
            ctx.body = {message: "Bad request"};
        }
    }
}


exports.getByActive = (ctx) => { //get pelo nome do principio ativo
    
    const querry = normalizer(ctx.query.name);
    
    
    if(querry.length == 0){
        ctx.status = 404
        ctx.body = {message: "Empty request"};
    }else{
        const regex = new RegExp((querry),"gi");
        let filtered = data.filter( test => (regex.test(normalizer(test['SUBSTÂNCIA'])) == true));
        
        //response handling
        if(filtered.length > 0){
            ctx.body = filtered;
        }else{
            ctx.status = 404
            ctx.body = {message: "Bad request"};
        }
    }


    
}
