/**
 * Module dependencies.
 */
var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

// Path to our public directory

var pub = __dirname + '/public';

var app = express.createServer(
  express.staticProvider(pub)
);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
    articleProvider.findAll(function(error, docs){
      res.render('articles/index', {
        locals: {
          title: 'Blog',
          articles: docs
        }
      });
    })
});

app.listen(2000);
