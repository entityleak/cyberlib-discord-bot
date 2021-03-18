require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { query, singleQuery, batchQuery } = require('./query');
const { getBookById } = require('./bookId');
const { bookSearch } = require('./search');

const { singleEmbed } = require('./singleEmbed');


var initialData;

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

client.login(process.env.BOT_TOKEN);

client.on('ready', async() => {
  
  const result = await batchQuery(params);
  initialData = result;
  console.log('Bot is ready');

});

client.on('message', async(msg) => {
  if(initialData){
    var messageEmbed = new Discord.MessageEmbed().setColor('#000000');

    if(msg.content.includes('https://library.trust.support/')){

      const singleResult = await getBookById(initialData, msg);
      console.log(singleResult);

      messageEmbed = singleEmbed(singleResult, messageEmbed);

      msg.channel.send(messageEmbed);

    }


    

    if(msg.content.includes('!library')){
      messageEmbed.setTitle('Your search: ' + msg.content.replace('!library ',''));
      messageEmbed.setDescription(bookSearch(initialData, msg));
      msg.reply(messageEmbed);
    }

  } 
  

});