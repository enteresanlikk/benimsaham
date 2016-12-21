var express = require('express');
var router = express.Router();
var session = require("express-session");
var Fields=require("../models/fields");

// Get Homepage
router.get('/Sahalar', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{
		res.render("fields",{title:"BenimSahamPanel",breadcrump:"Halısahalar"});
	}

		
});

router.get('/Halisaha_Ekle', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("fields_add",{title:"BenimSahamPanel",breadcrump:"Halısaha Ekle"});
	}

});

router.get('/Halisaha_Sil', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("fields_delete",{title:"BenimSahamPanel",breadcrump:"Halısaha Sil"});
	}
});

router.get('/Halisaha_Guncelle', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("fields_guncelle",{title:"BenimSahamPanel",breadcrump:"Halısaha Güncelle"});
	}
});

router.get('/fields', function(req, res){

		Fields.find(function(err,rents){
			res.json(rents);
		});

});

router.get('/saha_sayi', function(req, res){

		Fields.count(function(err,sayi){
			res.json(sayi);
		});

});

router.post('/saha_ekle', function(req, res){

		var isim=req.body.isim;
		var fiyat=req.body.fiyat;
		var resim=req.body.resim;

	Fields.count({"isim":isim},function(err,say){
			if(say!=0){
				res.send("1");
			}else{
				
				var newField=new Fields({
					"isim":isim,
					"fiyat":fiyat,
					"resim":resim
				});
				Fields.createFields(newField,function(err,sonuc){
					if(err){
						res.send("Kayıt Oluşturulurken Hata Oluştu!");
					}else{
						res.send("Kayıt Başarıyla Yapıldı.");
					}
				});

			}
		});

	
});


router.put("/fieldresimguncelle/",function(req,res){

	var id=req.body.id;
	var resim=req.body.resim;
	Fields.update({"_id":id},{$set:{"resim":resim}},function(err,sonuc){

		if(err){
			res.send("Resim Güncellenirken Bir Hata Oluştu!");
		}else{
			res.send("Resim Başarıyla Güncellendi.");
		}

	});

});

router.put("/fieldisimguncelle/",function(req,res){

	var id=req.body.id;
	var isim=req.body.isim;
	Fields.count({"isim":isim},function(err,sayi){
		if(sayi!=0){
			res.send("1");
		}else{

			Fields.update({"_id":id},{$set:{"isim":isim}},function(err,sonuc){

				if(err){
					res.send("Saha Adı Güncellenirken Bir Hata Oluştu!");
				}else{
					res.send("Saha Adı Başarıyla Güncellendi.");
				}

			});

		}
	});

});

router.put("/fieldfiyatguncelle/",function(req,res){

	var id=req.body.id;
	var fiyat=req.body.fiyat;
	Fields.update({"_id":id},{$set:{"fiyat":fiyat}},function(err,sonuc){

		if(err){
			res.send("Fiyat Güncellenirken Bir Hata Oluştu!");
		}else{
			res.send("Saha Fiyatı Başarıyla Güncellendi.");
		}

	});

});


router.delete("/fieldsdelete/:id",function(req,res){

	var id=req.params.id;
	Fields.remove({"_id":id},function(err,rents){});

});

module.exports = router;