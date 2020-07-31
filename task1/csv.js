const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = './csv/input.csv';
const txtFilePath = './txt/output.txt';

convertCsvData();

function convertCsvData() {
  csv()
    .fromFile(csvFilePath)
    .subscribe(
      (jsonData) => writeJsonToTxt(jsonData),
      (err) => console.error('Error:', err),
      () => console.log('Success')
    );
};

function writeJsonToTxt(jsonData) {
  fs.appendFileSync(txtFilePath, prepareJson(jsonData), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

function prepareJson(jsonData) {
  delete jsonData.Amount;
  Object.keys(jsonData).forEach(key => {
    let value = jsonData[key];
    delete jsonData[key];
    jsonData[key.toLowerCase()] = value;
  });
  console.log('jsonData: ' + JSON.stringify(jsonData));
  return JSON.stringify(jsonData) + '\n';
};
