/*This module will donwload the the file from the website, save it as csv them convert it to a JSON file*/

const url = 'https://dados.anvisa.gov.br/dados/TA_PRECO_MEDICAMENTO.csv'; //This is the url we will download from

const fs = require('fs');
const https = require('https');
const csv = require('csvtojson');



process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';  

console.log("Initiating DB update, from file " + url);

const Data = new Promise(function download(resolve){
        https.get(url,(res) => {
          const path = './newtable.csv'; 
          const filePath = fs.createWriteStream(path);
          res.pipe(filePath);
          filePath.on('finish',() => {
              filePath.close();
              console.log('Download Completed')
              resolve('./newtable.csv'); 
          })
        })
}).then(async function convert(csvFilePath){
      const jsonArray = await csv().fromFile(csvFilePath);
      return jsonArray
}).then((jsonObj) => {
      return writeToDisk(jsonObj)
}).then((path) => deleteFile(path));

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';  




function writeToDisk(jsonObj){
  const write = new Promise((resolve,reject) => {
    fs.writeFile('myjsonfile.json', JSON.stringify(jsonObj), 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          reject(err);
      }
      resolve('./newtable.csv')
      console.log("JSON file has been saved.");
      });
  })
  return write;
}

function deleteFile(path){
  fs.unlink(path, (err) => {//cleans the old csv file
  if (err) {
    console.error(err)
    return
  }
  console.log("Old files deleted. All done!")
})}