var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

var friends = ["Tony", "Miranda", "Justin", "Ben", "Tom"];
var posts = [
  {title: "Post 1", author: 'James'},
  {title: "Post 2", author: 'Caryn'},
  {title: "Post 3", author: 'Bella'}
];

app.get("/", function(req, res) {
  res.render('home');
});

app.get('/friends', function(req, res) {
  res.render('friends', {friends: friends});
});

app.get('/fallInLoveWith/:thing', function(req, res) {
  var thing = req.params.thing;
  res.render("love", {thingVar: thing});
});

app.get('/posts', function(req, res) {
  res.render("posts", {posts: posts});  //1st 'posts' refers to the variable in the template, 2nd 'posts' refers to the 'posts' array
});

app.post('/addPost', function(req, res) {
  var postTitle = req.body.postTitle;
  var postAuthor = req.body.postAuthor;
  posts.push({title: postTitle, author: postAuthor});
  console.log(posts);
  res.redirect('/posts');
});

app.post('/addFriend', function(req, res) {
  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect('/friends');
});

app.listen(port, function() {
  console.log('Server listening on port: ' + port);
});
