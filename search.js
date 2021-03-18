
function bookSearch(data, msg) {
  var searchTerm = msg.content.replace('!library ', '');
  
  if(searchTerm == '!library'){
    return "Please enter a search term :eye:"
  }

  var i = data.length;
  var results = [];
  var resultCounter = 0;
  var resultMax = 10;
  while (i--) {
    if(data[i].summary){
      if(resultCounter < resultMax){
      if (new RegExp("\\b"+searchTerm+"\\b",'i').test(data[i].summary)) {
          resultCounter++;
          results.push(data[i]);
          console.log('found', searchTerm, data[i].summary);
        }
      }
    } else if (data[i].title && data[i].primary_author) {
      if(resultCounter < resultMax){
      const substitute = [data[i].title, data[i].primary_author].join(', ');

      if (new RegExp("\\b"+searchTerm+"\\b",'i').test(substitute)) {
          resultCounter++;
          results.push(data[i]);
          console.log('found', searchTerm, data[i].title);
        }
      }
    }

    if(data[i].tags){
      if(resultCounter < resultMax){
      if(new RegExp("\\b"+searchTerm+"\\b",'i').test(data[i].tags)){
        console.log('Found by tag');
        // Check for duplicates
          const findDupe = results.find(({book_id}) => book_id == data[i].book_id);
          if(!findDupe){
            resultCounter++;
            results.push(data[i]);
          }
        }
      }
    }
  
    if(data[i].book_id == searchTerm){
      results = [data[i]];
    }
    
  }

  if(results.length != 0){

    var concat = [];
    results.forEach(result => {
      if(result.primary_author){
        concat.push(result.primary_author + ": " + "**" + result.title + "**" + " [Link](https://library.trust.support/"+ result.book_id +")");
      } else {
        concat.push("**" + result.title + "**" + " [Link](https://library.trust.support/"+ result.book_id +")");
      }
      
    });

    if(resultCounter >= resultMax){
      concat.push("...")
    }

    concat.join(', ')
    // console.log(results);
    // msg.channel.send(concat);

    return concat;
    
  } else {
    console.log('not found');
    // msg.channel.send("We didn't find anything :persevere:");
    return "We didn't find anything for **"+ searchTerm +"** :persevere:";
  }

}

module.exports = {
  bookSearch
}