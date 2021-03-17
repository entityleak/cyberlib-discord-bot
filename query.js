const {google} = require('googleapis');
require('dotenv').config();

const spreadsheet = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_APIKEY // specify your API key here
});


// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get?apix_params=%7B%22spreadsheetId%22%3A%221vt1SlAfqV5cvWFVBFslCiNl5xyocLi9U31NuafCLw6g%22%2C%22includeGridData%22%3Afalse%7D

async function query(params) {
  const res = await spreadsheet.spreadsheets.get({
    spreadsheetId: params.spreadsheetId,
    ranges: params.ranges,
    includeGridData: params.includeGridData,
  });
  // console.log(res.data.sheets[0].data[0].rowData);
  return res.data.sheets[0].data[0].rowData;
};

module.exports = {
  query
}
