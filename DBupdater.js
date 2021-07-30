const fs = require('fs');
const https = require('https');
const csv = require('csvtojson');
const csvFilePath='./newtable.csv';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';  

const url = 'https://dados.anvisa.gov.br/dados/TA_PRECO_MEDICAMENTO.csv';
  
https.get(url,(res) => {
    const path = './newtable.csv'; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
}).then(
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{fs.writeFile('myjsonfile.json', JSON.stringify(jsonObj), 'utf8',function (err) {
        if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }

  console.log("JSON file has been saved.");
})})
)

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';  





/*const csvFilePath='./newtable.csv';
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{fs.writeFile('myjsonfile.json', JSON.stringify(jsonObj), 'utf8',function (err) {
  if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }

  console.log("JSON file has been saved.");
})})*/