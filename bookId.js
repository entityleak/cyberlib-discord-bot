const { singleQuery } = require('./query');

var urlSplitter = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;

const params = {
  spreadsheetId: process.env.SHEET_ID
};

async function getBookById(data, msg){
  var match = urlSplitter.exec(msg.content);
  var bookId = match[3];
  if(bookId){
    const foundBook = data.find( ({book_id}) => book_id == bookId );
    const singleResult = await singleQuery(params, foundBook.row_number);
    console.log(singleResult);
    return singleResult;
  }
}

module.exports = {
  getBookById
}