require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query } = require('./query');
const { getBookId } = require('./bookId');


const params = {
  spreadsheetId: process.env.SHEET_ID,
  ranges: 'Books!A:A',
  includeGridData: true
};

client.login(process.env.BOT_TOKEN);

client.on('ready', async() => {
  console.log('Bot is ready');
  const result = await query(params);
  console.log(result);
});

client.on('message', (msg) => {
  const bookId = getBookId(msg);
  if (!bookId) {
    return
  } 
  msg.reply(bookId);
  
  // message(msg);

});