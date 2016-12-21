var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var inArray = require('in-array');
var connection=require("./lib/connection");


var routes = require('./routes/index');
var fields = require('./routes/fields');
var users = require('./routes/users');
var rents = require('./routes/rents');
var troubles = require('./routes/troubles');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'sadasdsdasdsadscasas',
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
  next();
});



app.use('/', routes);
app.use('/', fields);
app.use('/', rents);
app.use('/', troubles);
app.use('/', users);

app.use("/",function(req,res){

  res.render("hata_sayfasi",{title:"BenimSahamPanel"});

});


// Set Port
app.set('port', (process.env.PORT || 6060));

app.listen(app.get('port'), function(){
	console.log('Server '+app.get('port')+" portundan başlatıldı.");
});