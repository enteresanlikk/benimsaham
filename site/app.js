var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var connection=require("./lib/connection");

var routes = require('./routes/index');
var users = require('./routes/users');
var errorpage = require('./routes/errorpage');
var fields = require('./routes/fields');
var rents = require('./routes/rents');
var troubles = require('./routes/troubles');

var Fields = require('./models/fields');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/', users);
app.use('/', fields);
app.use('/', rents);
app.use('/', troubles);
app.get('/fields', function(req, res){
	Fields.find(function(err,fields){
		res.json(fields);
	});
});
app.use(function(req,res){
	res.render("errorpage",{title:"BenimSaham"+'&reg;'+" | Sayfa Bulunamadı !"});
});

// Set Port
app.set('port', (process.env.PORT || 3030));

app.listen(app.get('port'), function(){
	console.log('Server '+app.get('port')+" portundan başlatıldı.");
});