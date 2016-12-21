var express = require('express');
var router = express.Router();
var session = require("express-session");
var Fields = require('../models/fields');

// Get Homepage
router.get('/', function(req, res){
	if(req.session.kisi){
		res.render("index",{title:"BenimSaham"+'&reg;'+" | Anasayfa"});

	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/Giris-Yap');
	}

});

module.exports = router;