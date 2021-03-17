var urlSplitter = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;

function message(msg){
  if (msg.content.includes('library.trust.support')){
    
    var match = urlSplitter.exec(msg.content);

    var bookId = match[3];
    console.log(match);
    if(bookId){
      msg.reply(bookId);
    } else {
      msg.reply('No book!');
    }
  } 
}

module.exports = {
  message
}