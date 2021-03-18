function singleEmbed(single, embed){
  if(single.isbn){
    embed.setImage('http://covers.openlibrary.org/b/isbn/' + single.isbn + '-L.jpg'); 
  }
  if(single.primary_author){
    embed.setTitle(single.title).setDescription(single.primary_author);
  } else {
    embed.setTitle(single.title);
  }

  if(single.date){
    embed.addFields({ name: 'Published', value: single.date });
  }
  if(single.tags){
    embed.addFields({ name: 'Tags', value: single.tags });
  }
  if(single.from_where){
    embed.addFields({ name: 'From', value: single.from_where });
  }

  embed.addFields({ name: 'Read more', value: "[Link](https://library.trust.support/"+ single.book_id +")" });

  embed.setFooter('https://library.trust.support/' + single.book_id);

  return embed
}

module.exports = {
  singleEmbed
}