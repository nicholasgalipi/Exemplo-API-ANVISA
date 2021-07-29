const fs = require('fs');
const https = require('https');
  
// URL of the image
const url = 'https://dados.anvisa.gov.br/dados/TA_PRECO_MEDICAMENTO.csv';
  
https.get(url,(res) => {
    // Image will be stored at this path
    const path = './precos.csv'; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
})