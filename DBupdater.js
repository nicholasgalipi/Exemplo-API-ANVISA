/*This module will donwload the the file from the website, save it as csv them convert it to a JSON file*/

const url = 'https://dados.anvisa.gov.br/dados/TA_PRECO_MEDICAMENTO.csv'; //This is the url we will download from

const fs = require('fs');
const https = require('https');
const csv = require('csvtojson');
const csvFilePath='./newtable.csv'; //Path for the csv to JSON package

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';  

console.log("Initiating DB update, from file " + url);
  
https.get(url,(res) => {
    const path = './newtable.csv'; 
    const filePath = fs.createWriteStream(path); //creates the new CSV
    res.pipe(filePath);
      filePath.on('finish',() => {
      filePath.close();
        console.log('Download Completed');
        csv() //starts the csv converter func
            .fromFile(csvFilePath)
            .then((jsonObj)=>{fs.writeFile('myjsonfile.json', JSON.stringify(jsonObj), 'utf8',function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
                fs.unlink("./newtable.csv", (err) => {//cleans the old csv file
                    if (err) {
                      console.error(err)
                      return
                    }
                    console.log("Old files deleted. All done!")
                  })
            })})
            
})
})




  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';  