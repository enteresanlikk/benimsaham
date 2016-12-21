var express = require('express');
var router = express.Router();
var session = require("express-session");
var Troubles=require("../models/troubles");

// Get Homepage
router.get('/Gorusler', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("troubles",{title:"BenimSahamPanel",breadcrump:"Görüşler"});
	}
});

router.get('/troubles', function(req, res){
	
		Troubles.find({"bakildimi":"0"},function(err,gorusler){
			res.json(gorusler);
		});

});

router.get("/traoublescount",function(req,res){

	Troubles.count({"bakildimi":"0"},function(err,sayi){
			res.json({"sayi":sayi});
	});
});

router.delete("/troublesdelete/:id",function(req,res){

	var id=req.params.id;
	Troubles.remove({"_id":id},function(err,rents){});

});

router.delete("/gorusler_sil",function(req,res){

	Troubles.remove(function(err,rents){});

});

module.exports = router;