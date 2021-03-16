const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot is ready');
});

var urlSplitter = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;

client.on('message', (msg) => {
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
});