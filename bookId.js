const { singleQuery } = require('./query');


const params = {
  spreadsheetId: process.env.SHEET_ID
};

async function getBookById(data, id){

  if(id){
    const foundBook = data.find( ({book_id}) => book_id == id );
    const singleResult = await singleQuery(params, foundBook.row_number);
    return singleResult;
  }
}

module.exports = {
  getBookById
}