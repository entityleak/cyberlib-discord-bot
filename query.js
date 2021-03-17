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
    // includeGridData: params.includeGridData,
  });
  // console.log(res.data.sheets[0].data[0].rowData);
  var shapedData = []

  const rows = res.data.values;
  if (rows.length) {
    // Print columns A and E, which correspond to indices 0 and 4.
    rows.map((row,index) => {
      // console.log(`${row[0]}, ${row[1]},${row[3]}`);
      // console.log(index);
      shapedData.push({
        rowNumber: index,
        id: row[0],
        title: row[1],
        author: row[3]
      })
    });
  } else {
    console.log('No data found.');
  }

  return shapedData
  // return res.data.sheets[0].data[0].rowData;
};

module.exports = {
  query
}
