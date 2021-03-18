
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

  if(results.length > 1){

    var concat = [];
    results.forEach(result => {
      concat.push(result.title);
    });
    concat.join(', ')
    console.log(results);
    msg.channel.send(concat);
    
  } else if(results.length == 1){
    msg.channel.send(results[0].title);
  }
  else{
    console.log('not found');
    msg.channel.send("We didn't find anything :persevere:");
  }

}

module.exports = {
  bookSearch
}