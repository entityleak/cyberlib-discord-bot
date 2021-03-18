require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query, singleQuery, batchQuery } = require('./query');
const { getBookById } = require('./bookId');
const { bookSearch } = require('./search');

const { singleEmbed } = require('./singleEmbed');


var initialData;

var dataTimeout = 24*60*60*1000;

const params = {
  spreadsheetId: process.env.SHEET_ID,
  ranges: [
    'A:A',
    'B:B',
    'D:D',
    'N:N',
    'AH:AH',
    'AC:AC'
  ]
};

async function dataRefresh(){
  setInterval(async function(){ // repeat this every __ hours
    const result = await batchQuery(params);
    initialData = result;
    console.log('Fresh data');
  }, dataTimeout)
}

client.login(process.env.BOT_TOKEN);

client.on('ready', async() => {
  
  initialData = await batchQuery(params);
  console.log('Bot is ready');
  
  dataRefresh();

});

client.on('message', async(msg) => {
  if(initialData){
    var messageEmbed = new Discord.MessageEmbed().setColor('#000000');

    // user pastes a link
    if(msg.content.includes('https://library.trust.support/')){
      const singleResult = await getBookById(initialData, msg);
      messageEmbed = singleEmbed(singleResult, messageEmbed);
      msg.channel.send(messageEmbed);
    }

    // user searches
    if(msg.content.includes('!library')){
      messageEmbed.setTitle('Your search: ' + msg.content.replace('!library ',''));
      messageEmbed.setDescription(bookSearch(initialData, msg));
      msg.reply(messageEmbed);
    }

  } 
  

});