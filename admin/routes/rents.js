var express = require('express');
var router = express.Router();
var session = require("express-session");
var Rents=require("../models/rents");
var inArray = require('in-array');


// Get Homepage
router.get('/Kiralayanlar', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("rents",{title:"BenimSahamPanel",breadcrump:"Kiralayanlar"});
	}
});

router.get("/Kazanc",function(req,res){

	Rents.aggregate({
		$group:{
			_id:"$gender",
			saha_fiyat:{$sum:"$saha_fiyat"}
		}
	},function(err,sonuc){
			res.json(sonuc);
	});
});


router.get("/rents",function(req,res){
	Rents.find(function(err,kiralar){
		res.json(kiralar);
		
	});

});

router.delete("/rentsdelete/:id",function(req,res){

	var id=req.params.id;
	Rents.remove({"_id":id},function(err,rents){});

});

router.delete("/kiralar_sil",function(req,res){

	Rents.remove(function(err,rents){});

});



router.get("/rents2",function(req,res){

	var aa= new Date();
	var tarih=(aa.getDate())+"-"+(aa.getMonth()+1)+"-"+aa.getFullYear();
	
	Rents.find({tarih:tarih},{saha_isim:true,saat:true,tarih:true},function(err,kiralar){
		res.json(kiralar);
		
	});

});


module.exports = router;