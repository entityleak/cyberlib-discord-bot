require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query, singleQuery } = require('./query');
const { getBookId } = require('./bookId');

var initialData;

const params = {
  spreadsheetId: process.env.SHEET_ID,
  ranges: 'Books!A:D',
  includeGridData: true
};

client.login(process.env.BOT_TOKEN);

client.on('ready', async() => {
  console.log('Bot is ready');
  const result = await query(params);
  initialData = result;
  // console.log(initialData);
});

client.on('message', async(msg) => {
  const bookId = getBookId(msg);
  if(initialData){

  
  if (bookId) {
    const foundBook = initialData.find( ({id}) => id == bookId );
    const singleResult = await singleQuery(params, foundBook.rowNumber);
    msg.reply(singleResult.summary);
  } 

  } else {
    msg.reply('Initial data not present')
  }
  
  // message(msg);

});