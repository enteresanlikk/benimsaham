var express = require('express');
var router = express.Router();

var Troubles = require('../models/troubles');

// Register
router.get('/gorusler', function(req, res){
	Troubles.find(function(err,troubles){
		res.json(troubles);
	});
});

router.post('/gorusEkle', function(req, res){
	
	var isim=req.body.isim;
	var email=req.body.email;
	var telefon=req.body.telefon;
	var sorun=req.body.sorun;

	req.checkBody("isim","!").notEmpty();
	req.checkBody("email","!").notEmpty();
	req.checkBody("telefon","!").notEmpty();
	req.checkBody("sorun","!").notEmpty();
	var errors=req.validationErrors();
	if(errors){
		res.send("Boş Alan Bırakmayınız!");
	}else{
		var newTrouble = new Troubles({
			isim: isim,
			email:email,
			telefon: telefon,
			sorun: sorun,
			bakildimi:"0"
		});
	
		Troubles.createTrouble(newTrouble,function(err,sonuc){
			
			if(err){
				res.send("SORUNUNUZ GÖNDERİLEMEDİ!");
			}else{
				res.send("SORUNUNUZ ALINMIŞTIR. TEŞEKKÜRLER.");
			}

		});
	}

});


module.exports = router;