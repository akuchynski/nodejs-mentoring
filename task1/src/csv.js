import { appendFile, existsSync, unlinkSync, createReadStream } from 'fs';
import { csv } from 'csvtojson';
import { resolve } from 'path';

deleteTxtFile(resolve('txt', 'output.txt'));
convertCsvData();
convertCsvDataByStream();

function convertCsvData() {
  csv()
    .fromFile(resolve('csv', 'input.csv'))
    .subscribe(
      (jsonData) => writeJsonToTxt(jsonData),
      (err) => console.error('Error:', err),
      () => console.log('Success')
    );
};

function convertCsvDataByStream() {
  csv()
    .fromStream(createReadStream(resolve('csv', 'input.csv')))
    .subscribe(
      (jsonData) => writeJsonToTxt(jsonData),
      (err) => console.error('Error:', err),
      () => console.log('Success')
    );
};

function writeJsonToTxt(jsonData) {
  appendFile(resolve('txt', 'output.txt'), prepareJson(jsonData), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

function prepareJson(jsonData) {
  const entries = Object.entries(jsonData)
    .filter(([key]) => key != 'Amount')
    .map(([key, value]) => [key.toLowerCase(), key === 'Price' ? Number(value) : value]);
  console.log('jsonData: ' + JSON.stringify(Object.fromEntries(entries)));
  return JSON.stringify(Object.fromEntries(entries)).concat('\n');
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