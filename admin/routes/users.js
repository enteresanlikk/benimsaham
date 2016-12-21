var express = require('express');
var router = express.Router();
var session = require("express-session");
var Users=require("../models/user");


router.get('/Kullanicilar', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("users",{title:"BenimSahamPanel",breadcrump:"Kullanıcılar"});
	}
});

router.get('/admin', function(req, res){

		id=req.session.kisi;
		Users.find({"_id":id},{_id:false,password:false},function(err,kisi){
			res.json(kisi);
		});

});


router.get('/Kullanici_Sil', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("user_delete",{title:"BenimSahamPanel",breadcrump:"Kullanıcı Sil"});
	}
});

router.get('/Kullanici_Guncelle', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("user_guncelle",{title:"BenimSahamPanel",breadcrump:"Kullanıcı Güncelle"});
	}
});

router.get('/Kullanici_Ekle', function(req, res){

	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("user_add",{title:"BenimSahamPanel",breadcrump:"Kullanıcı Ekle"});
	}
});

router.get('/Profilim', function(req, res){
	
	if(!req.session.kisi){
		res.redirect("/Giris-Yap");
	}else{

		res.render("profilim",{title:"BenimSahamPanel",breadcrump:"Profilim"});
	}
});

router.get('/Giris-Yap', function(req, res){

	if(req.session.kisi){
		res.redirect("/");
	}else{
		res.render("login",{title:"BenimSahamPanel"});
	}
	

});


router.post('/Giris-Yap', function(req, res){

	var username=req.body.username;
    var password=req.body.password;

	console.log(username+"/"+password);

		Users.count({"username":username,"password":password,"yetki":"yönetici"},function(err,say){
			if(say!=0){
				
				Users.findOne({"username":username,"password":password},{"_id":true},function(err,user){
			
					var id=user._id;
					req.session.kisi=id;
					res.send("1");				
				});
				
				
			}else{
						
				res.send("Kullanıcı Adı veya Şifre Hatalı! ya da Yetkiniz Yok!");

			}
			
		});

});

router.get("/users",function(req,res){
	var id=req.session.kisi;
	Users.find({"_id":{$ne:id}},function(err,users){
		res.json(users);
	});
});

router.get("/uye_sayi",function(req,res){
	var id=req.session.kisi;
	Users.count({"_id":{$ne:id}},function(err,sayi){
		res.json(sayi);
	});
});

router.delete("/usersdelete/:id",function(req,res){

	var id=req.params.id;
	Users.remove({"_id":id},function(err,rents){});

});

router.put("/uyekadiguncelle",function(req,res){

	var id=req.body.id;
	var username=req.body.kadi;
	Users.count({"username":username},function(err,say){
		if(say!=0){
			res.send("1");
		}else{

			Users.update({"_id":id},{$set:{"username":username}},function(err,sonuc){

				if(err){
					res.send("Kullanıcı Adı Güncellenirken Bir Hata Oluştu!");
				}else{
					res.send("Kullanıcı Adı Başarıyla Güncellendi.");
				}

			});


		}
	});
	
});


router.put("/uyeemailguncelle",function(req,res){

	var id=req.body.id;
	var email=req.body.email;
	Users.update({"_id":id},{$set:{"email":email}},function(err,sonuc){

		if(err){
			res.send("E-Mail Güncellenirken Bir Hata Oluştu!");
		}else{
			res.send("E-Mail Başarıyla Güncellendi.");
		}

	});

});

router.put("/uyetelefonguncelle",function(req,res){

	var id=req.body.id;
	var phone=req.body.phone;
	Users.update({"_id":id},{$set:{"phone":phone}},function(err,sonuc){

		if(err){
			res.send("Telefon Güncellenirken Bir Hata Oluştu!");
		}else{
			res.send("Telefon Başarıyla Güncellendi.");
		}

	});

});


// Register User
router.post('/users_add', function(req, res){
	var email = req.body.mail;
	var username = req.body.kadi;
	var password = req.body.sifre;
	var phone = req.body.telefon;
	var yetki = req.body.yetki;

		Users.count({"username":username},function(err,say){
		
		if(say!=0){
			
			res.send("1");
			
		}else{
			
		
			
					var newUser = new Users({
						username: username,
						email:email,
						password: password,
						phone: phone,
						yetki:yetki
					});

					Users.createUser(newUser, function(err, user){
						if(err){
							res.send("Kayıt Oluşturulamadı!");
						}else{
							res.send("Kayıt Başarıyla Tamamlandı.");
						}
					});


			
			}
			
		});

	
});


router.get('/Cikis', function(req, res){
	delete req.session.kisi;

	res.redirect('/Giris-Yap');
});

router.put("/Sifre_Guncelle",function(req,res){
	
	var sifre=req.body.password;
    var yenisifre1=req.body.password1;
	var yenisifre2=req.body.password2;
	var id=req.session.kisi;

		if(yenisifre1!=yenisifre2){
			res.send("YENİ ŞİFRELER EŞLEŞMİYOR!");
		}else{

			Users.count({"_id":id,"password":sifre},function(err,say){

			if(say!=0){
				
				Users.update({"_id":id},{$set:{"password":yenisifre1}},function(err,sonuc){

					if(err){
						res.send("ŞİFRE GÜNCELLENİRKEN BİR HATA OLUŞTU!");
					}else{
						res.send("1");
					}

				});


				}else{
					res.send("ESKİ ŞİFRENİZ YANLIŞ!");
				}

			});

		}

});


router.put("/Kadi_Guncelle",function(req,res){
	
	var kadi=req.body.kadi;
    var kadi1=req.body.kadi1;
	var kadi2=req.body.kadi2;
	var id=req.session.kisi;

		if(kadi1!=kadi2){
			res.send("KULLANICI ADLARI EŞLEŞMİYOR!");
		}else{

			Users.count({"_id":id,"username":kadi},function(err,say){

			if(say!=0){
				
				Users.find({"username":kadi1},function(err,sss){

					if(sss!=0){
						res.send("LÜTFEN FARKLI BİR KULLANICI ADI DENEYİNİZ!");
					}else{

						Users.update({"_id":id},{$set:{"username":kadi1}},function(err,sonuc){

							if(err){
								res.send("KULLANICI ADI GÜNCELLENİRKEN BİR HATA OLUŞTU!");
							}else{
								res.send("1");
							}

						});

					}

				});


				}else{
					res.send("ESKİ KULLANICI ADINIZ YANLIŞ!");
				}

			});

		}

});

router.put("/Email_Guncelle/",function(req,res){

	var id=req.session.kisi;
	var email=req.body.email;
	var email1=req.body.email1;
	var email2=req.body.email2;
	if(email1!=email2){
		res.send("YENİ MAİL ADRESLERİ EŞLEŞMİYOR!");
	}else{

		Users.count({"email":email,"_id":id},function(err,sayi){

			if(sayi==0){
				res.send("ESKİ E-MAİL ADRESİ YANLIŞ!");
			}else{

				Users.update({"_id":id},{$set:{"email":email1}},function(err,sonuc){

					if(err){
						res.send("E-MAİL GÜNCELLENİRKEN BİR HATA OLUŞTU!");
					}else{
						res.send("1");
					}

				});

			}

		});

	}

});

router.put("/Telefon_Guncelle/",function(req,res){

	var id=req.session.kisi;
	var telefon=req.body.telefon;
	var telefon1=req.body.telefon1;
	var telefon2=req.body.telefon2;
	if(telefon1!=telefon2){
		res.send("YENİ TELEFON NUMARALARI EŞLEŞMİYOR!");
	}else{

		Users.count({"phone":telefon,"_id":id},function(err,sayi){

			if(sayi==0){
				res.send("ESKİ TELEFON NUMARASI YANLIŞ!");
			}else{

				Users.update({"_id":id},{$set:{"phone":telefon1}},function(err,sonuc){

					if(err){
						res.send("TELEFON NUMARASI GÜNCELLENİRKEN BİR HATA OLUŞTU!");
					}else{
						res.send("1");
					}

				});

			}

		});

	}

});



module.exports = router;