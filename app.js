const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

mongoose.connect('mongodb+srv://admin-g:admin@cluster0.rezmg.mongodb.net/justinDB', { useNewUrlParser: true, useUnifiedTopology: true}); 
//mongodb://localhost:27017/justinDB
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true]
  }
});
const quoteSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true]
  }
});
const clientSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  comment: String
});

const Post = mongoose.model('Post', postSchema);
const Quote = mongoose.model('Quote', quoteSchema);
const Client = mongoose.model('Client', clientSchema);

app.get('/', function(req, res) {
    Quote.find({}, function(err, quotes) {
        if (err) {
          alert(err);
        } else {
          res.render('home', {quotes: quotes});
        }
    });
});
app.get('/clients', function(req, res) {
  Client.find({}, function(err, clients) {
      if (err) {
        alert(err);
      } else {
        res.render('clients', {clients: clients});
      }
  });
});
app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/media', function(req, res) {
    res.render('media');
});
app.get('/learn', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
          alert(err);
        } else {
          res.render('learn', {posts: posts});
        }
    });
});
app.get('/pricing', function(req, res) {
    res.render('pricing');
});
app.get('/compose', function(req, res) {
    res.render('compose');
});
app.get('/schedule', function(req, res) {
  res.render('schedule');
});

app.post('/compose', function(req, res) {
  const post = new Post({
    content: req.body.post
  });
  post.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
  const quote = new Quote({
    content: req.body.quote
  });
  quote.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
});
app.post('/schedule', function(req, res) {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    comment: req.body.comment
  });
  client.save(function(err) {
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started");
});