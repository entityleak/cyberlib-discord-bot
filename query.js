const {google} = require('googleapis');
require('dotenv').config();

const spreadsheet = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_APIKEY // specify your API key here
});


// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get?apix_params=%7B%22spreadsheetId%22%3A%221vt1SlAfqV5cvWFVBFslCiNl5xyocLi9U31NuafCLw6g%22%2C%22includeGridData%22%3Afalse%7D

async function query(params) {
  const res = await spreadsheet.spreadsheets.values.get({
    spreadsheetId: params.spreadsheetId,
    range: params.ranges,
  });
  var shapedData = []

  const rows = res.data.values;
  if (rows.length) {
    rows.map((row,index) => {
      shapedData.push({
        row_number: index,
        book_id: row[0],
        title: row[1],
        author: row[3]
      })
    });
  } else {
    console.log('No data found.');
  }

  return shapedData
};

async function singleQuery(params, rowNumber) {
  const res = await spreadsheet.spreadsheets.values.batchGet({
    spreadsheetId: params.spreadsheetId,
    ranges: ['1:1', `${rowNumber}:${rowNumber}`],
  });
  var shapedData = {}
  var taxonomies = []

  res.data.valueRanges[0].values[0].forEach(e => {
    taxonomies.push(e.toLowerCase().replace(/ /g, '_'));
  });

  const singleQueryResult = res.data.valueRanges[1].values[0];
  
  for (let index = 0; index < singleQueryResult.length; index++) {
    var column = singleQueryResult[index];
    const taxonomy = taxonomies[index];

    if(taxonomy == 'isbn'){
      column = column.replace('[','').replace(']','');
    }
    
    shapedData[taxonomy] = column;
  }
  return shapedData;
};


async function batchQuery(params) {
  const res = await spreadsheet.spreadsheets.values.batchGet({
    spreadsheetId: params.spreadsheetId,
    ranges: params.ranges,
  });
  var shapedData = [{}];
  var columns = [];


  res.data.valueRanges.forEach(e => {
    columns.push(e.values);
  });

  var taxonomy;

  columns.map( (subarray) => {
    // console.log(subarray.length);

    subarray.map((value, index) => {
      // console.log(index, value[0]);
      if(index === 0){
        taxonomy = value[0].toLowerCase().replace(' ', '_');
        // console.log(taxonomy);
      }

      if(index !== 0){
        var source = {};
        source[taxonomy] = value[0];
        source.row_number = index + 1;

        if(shapedData[index]){
          shapedData[index] = Object.assign(shapedData[index], source);
        } else {
          shapedData.push({});
          shapedData[index] = Object.assign(shapedData[index], source);
        }
      }
    })
  }
  );

  // console.log(shapedData[282].tags);
  return shapedData
};

module.exports = {
  query,
  batchQuery,
  singleQuery
}
