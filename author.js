var urlSplitter = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;

function getBookId(msg){
  if (msg.content.includes('https://library.trust.support/')){
    
    var match = urlSplitter.exec(msg.content);

    var bookId = match[3];
    console.log(match);
    if(bookId){
      return bookId
    }
  } 
}

module.exports = {
  getBookId
}