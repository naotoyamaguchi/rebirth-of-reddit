// jshint esversion :6
var theBody = document.getElementById('contentBox');
var random = document.getElementById('randomButton');
var myBoards = document.getElementById('myBoardsButton');
var getTheApp = document.getElementById('getTheAppButton');
var subreddit = 'https://www.reddit.com/r/gifs.json';

function logError(error){
  console.log('arguments: ', arguments);
  console.log('logError error' , error);
}

function reqHelper(api, listener){
  var req = new XMLHttpRequest();
  req.addEventListener('error', logError);
  req.onreadystatechange = function() {
    console.log(this.readyState);
    if(this.readyState == 2) {
      console.log(req.getResponseHeader("Content-Type"));
    }
  };
  req.addEventListener('load', listener);
  req.open('GET', api);
  req.send();

}




(function(window) {
function apiListener(){
  var apiChildren = JSON.parse(this.responseText);
  console.log(apiChildren);
  for(let i = 1; i < apiChildren.data.children.length; i++){
    let newAnchor = document.createElement('a');
    newAnchor.href = `http://reddit.com${apiChildren.data.children[i].data.permalink}`;
    newAnchor.target = '_blank';
    let newPost = document.createElement('div');
    newAnchor.className = "postBox";
    let newGif = document.createElement('div');
    newGif.className = "item-image";
    if(apiChildren.data.children[i].data.preview.images[0].variants.gif){
      newGif.style = `background-image: url('${apiChildren.data.children[i].data.preview.images[0].variants.gif.source.url};')`;
    } else{
      newGif.style = `background-image: url('${apiChildren.data.children[i].data.preview.images[0].source.url};')`;
    }
    let newTitle = document.createElement('div');
    newTitle.className = "post-title";
    newTitle.innerHTML = apiChildren.data.children[i].data.title;
    let newDetails = document.createElement('div');
    newDetails.className = "item-details";
    let newUpvotes = document.createElement('span');
    newUpvotes.innerHTML = apiChildren.data.children[i].data.score + " upvotes";
    let newAuthor = document.createElement('span');
    newAuthor.innerHTML = "by " + apiChildren.data.children[i].data.author;
    newDetails.innerHTML = newAuthor.innerHTML + " • " + newUpvotes.innerHTML;
    newPost.appendChild(newGif);
    newPost.appendChild(newTitle);
    newPost.appendChild(newDetails);
    newAnchor.appendChild(newPost);
    theBody.appendChild(newAnchor);
  }

  myBoards.addEventListener('click', function(){
    console.log('my boards button works');
  });

  getTheApp.addEventListener('click', function(){
    console.log('get the app button works');
  });

  random.addEventListener('click', function(){
    reqHelper('http://www.reddit.com/r/random.json', apiListener);
    function apiListener(){
      theBody.innerHTML = '';
      console.log(this.responseText);
      var apiChildren = JSON.parse(this.responseText);
      console.log(apiChildren);
      for(let i = 1; i < apiChildren.data.children.length; i++){
        let newAnchor = document.createElement('a');
        newAnchor.href = `http://reddit.com${apiChildren.data.children[i].data.permalink}`;
        newAnchor.target = '_blank';
        let newPost = document.createElement('div');
        newAnchor.className = "postBox";
        let newGif = document.createElement('div');
        newGif.className = "item-image";
        if(apiChildren.data.children[i].data.preview.images[0].variants.gif){
          newGif.style = `background-image: url('${apiChildren.data.children[i].data.preview.images[0].variants.gif.source.url};')`;
        } else{
          newGif.style = `background-image: url('${apiChildren.data.children[i].data.preview.images[0].source.url};')`;
        }
        let newTitle = document.createElement('div');
        newTitle.className = "post-title";
        newTitle.innerHTML = apiChildren.data.children[i].data.title;
        let newDetails = document.createElement('div');
        newDetails.className = "item-details";
        let newUpvotes = document.createElement('span');
        newUpvotes.innerHTML = apiChildren.data.children[i].data.score + " upvotes";
        let newAuthor = document.createElement('span');
        newAuthor.innerHTML = "by " + apiChildren.data.children[i].data.author;
        newDetails.innerHTML = newAuthor.innerHTML + " • " + newUpvotes.innerHTML;
        newPost.appendChild(newGif);
        newPost.appendChild(newTitle);
        newPost.appendChild(newDetails);
        newAnchor.appendChild(newPost);
        theBody.appendChild(newAnchor);
      }
    }
  });
}


reqHelper(subreddit, apiListener);
})(window); 