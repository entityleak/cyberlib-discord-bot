
function bookSearch(data, msg) {
  var searchTerm = msg.content.replace('!library ', '');
  var i = data.length;
  var results = [];
  var resultCounter = 0;
  var resultMax = 10;
  while (i--) {
    if(data[i].summary){
      if (new RegExp("\\b"+searchTerm+"\\b",'i').test(data[i].summary)) {
        if(resultCounter <= resultMax){
          resultCounter++;
          results.push(data[i]);
          console.log('found', searchTerm, data[i].summary);
        }else{
          console.log('max results reached');

        }
      }
    } else if (data[i].title && data[i].primary_author) {
      const substitute = [data[i].title, data[i].primary_author].join(', ');

      if (new RegExp("\\b"+searchTerm+"\\b",'i').test(substitute)) {
        if(resultCounter <= resultMax){
          resultCounter++;
          results.push(data[i]);
          console.log('found', searchTerm, data[i].title);
        }else{
          console.log('max results reached');

        }
      }
    }

  }

  if(results.length){

    var concat = [];
    results.forEach(result => {
      if(result.primary_author){
        concat.push(result.primary_author + ": " + "**" + result.title + "**" + " [Link](https://library.trust.support/"+ result.book_id +")");
      } else {
        concat.push("**" + result.title + "**" + " [Link](https://library.trust.support/"+ result.book_id +")");
      }
    });
    concat.join(', ')
    console.log(results);
    // msg.channel.send(concat);

    return concat;
    
  } else{
    console.log('not found');
    // msg.channel.send("We didn't find anything :persevere:");
    return "We didn't find anything :persevere:";
  }

}

module.exports = {
  bookSearch
}