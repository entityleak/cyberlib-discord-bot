require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query, singleQuery, batchQuery } = require('./query');
const { getBookId } = require('./bookId');
const { bookSearch } = require('./search');

var initialData;

const params = {
  spreadsheetId: process.env.SHEET_ID,
  ranges: [
    'A:A',
    'B:B',
    'D:D',
    'N:N',
    'AH:AH'
  ]
};

client.login(process.env.BOT_TOKEN);

client.on('ready', async() => {
  
  const result = await batchQuery(params);
  initialData = result;
  console.log('Bot is ready');

});

client.on('message', async(msg) => {
  if(initialData){
    const bookId = getBookId(msg);

    if (bookId) {
      const foundBook = initialData.find( ({book_id}) => book_id == bookId );
      const singleResult = await singleQuery(params, foundBook.row_number);
      const cover = new Discord.MessageEmbed().setImage('http://covers.openlibrary.org/b/isbn/' + singleResult.isbn + '-L.jpg'); 

      if(singleResult.summary){
        msg.channel.send(singleResult.summary);
        // msg.channel.send(cover);
      } else {
        msg.channel.send(singleResult.title);
        // msg.channel.send(cover);
      }
    }

    if(msg.content.includes('!library')){
      msg.channel.send(bookSearch(initialData, msg));      
    }

  } 
  

});