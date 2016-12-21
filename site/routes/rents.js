var express = require('express');
var router = express.Router();

var Rents = require('../models/rents');


router.get('/rents', function(req, res){
	Rents.find(function(err,rents){
		res.json(rents);
	});
});

router.post('/kirala', function(req, res){

	var kisi_isim=req.session.isim;
	var kisi_id=req.session.kisi;
	var saha_id=req.body.saha_id;
	var saha_isim=req.body.saha_isim;
	var saha_fiyat=req.body.saha_fiyat;
	var saat=req.body.kira_saat;
	var tarih=req.body.kira_tarih;

	var aa=new Date(tarih);
	
	var tarih1=(aa.getDate())+"-"+(aa.getMonth()+1)+"-"+aa.getFullYear();
	var bb= new Date();
	var tarih2=(bb.getDate())+"-"+(bb.getMonth()+1)+"-"+bb.getFullYear();
	console.log(aa+"---TİME---"+aa.getTime());
	console.log(bb+"---TİME---"+bb.getTime());
if(aa.getTime()>bb.getTime()){
	
	Rents.count({"saha_id":saha_id,"saat":saat,"tarih":tarih1},function(err,say){
			
			if(say!=0){

				res.send('BU SAATLER ARASINDA SAHAMIZ DOLUDUR!');
				
			}else{

				var newRent=new Rents({
					"kisi_id":kisi_id,
					"saat":saat,
					"kisi_isim":kisi_isim,
					"tarih":tarih1,
					"saha_id":saha_id,
					"saha_isim":saha_isim,
					"saha_fiyat":saha_fiyat,
					"kiralama_saati":tarih2
				});

				Rents.createRent(newRent,function(err,rent){
					if(err) throw err;
				});

				res.send('SAHANIZ KİRALANMIŞTIR. TEŞEKKÜRLER.');

			}

	});
	

}else{
	res.send("LÜTFEN DAHA İLERİ BİR TARİH SEÇİNİZ!");
}
				

});

router.get("/sahalarim",function(req,res){

	if(req.session.kisi){
		var kisi=req.session.kisi;

		Rents.find({"kisi_id":kisi},function(err,myrents){

			res.json(myrents);
			
		});

	}

});

router.delete("/sahalarim/:id",function(req,res){
	var kira_id=req.params.id;
	var kisi=req.session.kisi;
		Rents.count({"kisi_id":kisi},function(err,say){

			if(say!=0){

				Rents.remove({"_id":kira_id,"kisi_id":kisi},function(err,rents){
		
				});

			}else{

				res.redirect("/");

			}

		});
});


module.exports = router;