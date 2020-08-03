import { appendFileSync, existsSync, unlinkSync } from 'fs';
import { csv } from 'csvtojson';

const csvFilePath = './csv/input.csv';
const txtFilePath = './txt/output.txt';

deleteTxtFile(txtFilePath);
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
  appendFileSync(txtFilePath, prepareJson(jsonData), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

function prepareJson(jsonData) {
  delete jsonData.Amount;
  jsonData.Price = Number(jsonData.Price);
  Object.keys(jsonData).forEach(key => {
    let value = jsonData[key];
    delete jsonData[key];
    jsonData[key.toLowerCase()] = value;
  });
  console.log('jsonData: ' + JSON.stringify(jsonData));
  return JSON.stringify(jsonData) + '\n';
};

function deleteTxtFile(path) {
  if (existsSync(path)) {
    try {
      unlinkSync(path)
    } catch (err) {
      console.error(err);
    }
  }
};