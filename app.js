require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query, singleQuery, batchQuery } = require('./query');
const { getBookId } = require('./bookId');

var initialData;

const params = {
  spreadsheetId: process.env.SHEET_ID,
  ranges: [
    'A:A',
    'B:B',
    'D:D',
    'N:N',
    'AH:AH'
  ],
  includeGridData: true
};

client.login(process.env.BOT_TOKEN);

client.on('ready', async() => {
  console.log('Bot is ready');
    
  const result = await batchQuery(params);
  initialData = result;

});

client.on('message', async(msg) => {
  const bookId = getBookId(msg);
  if(initialData){

  
  if (bookId) {
    const foundBook = initialData.find( ({book_id}) => book_id == bookId );
    const singleResult = await singleQuery(params, foundBook.row_number);
    // console.log(singleResult);
    if(singleResult.summary){
      msg.reply(singleResult.summary);
    }
  }

  } else {
    // msg.reply('Initial data not present')
  }
  
  // message(msg);

});