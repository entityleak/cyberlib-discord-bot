require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query } = require('./query');
const { message } = require('./message');


const params = {
  spreadsheetId: process.env.SHEET_ID,
  ranges: 'Books!A:A',
  includeGridData: true
};

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot is ready');
  query(params);
});

client.on('message', (msg) => {

  message(msg);

});