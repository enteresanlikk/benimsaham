var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Register
router.get('/Kayit-Ol', function(req, res){
	if(req.session.kisi){
		res.redirect("/");
	} else {
		//req.flash('error_msg','You are not logged in');
		res.render('register',{title:"BenimSaham"+'&reg;'+" | Kayıt Ol"});
	}
});

// Login User
router.get('/kisi', function(req, res){
	if(req.session.kisi){
		
		id=req.session.kisi;
		User.find({"_id":id},{_id:false,password:false,email:false,phone:false},function(err,kisi){
			res.json(kisi);
		});
		
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/Giris-Yap');
	}
});

// Login
router.get('/Giris-Yap', function(req, res){
	if(req.session.kisi){
		res.redirect("/");
	} else {
		//req.flash('error_msg','You are not logged in');
		res.render('login',{title:"BenimSaham"+'&reg;'+" | Giriş Yap"});
	}
});

// Register User
router.post('/Kayit-Ol', function(req, res){
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var phone = req.body.phone;
	
	var veriler=[{"password":password,"password2":password2,"email":email,"phone":phone}];


	if(password!=password2){
		res.send("ŞİFRELER EŞLEŞMİYOR!");
	}else{

		User.count({"username":username},function(err,say){
			
			if(say!=0){
				
				res.send('LÜTFEN! FARKLI BİR KULLANICI ADI DENEYİNİZ.');
				
			}else{
				
			
				
						var newUser = new User({
							username: username,
							email:email,
							password: password,
							phone: phone,
							yetki:"Üye"
						});

						User.createUser(newUser, function(err, user){
							if(err) throw err;
						});

						res.send("1");

				
			}
			
		});

	}

});

router.post('/Giris-Yap',function(req, res) {
    var username=req.body.username;
    var password=req.body.password;

		User.count({"username":username,"password":password},function(err,say){
			if(say!=0){
				
				User.findOne({"username":username,"password":password},{"_id":true,"username":true},function(err,user){
			
					var id=user._id;
					var isim=user.username;
					req.session.kisi=id;
					req.session.isim=isim;
					
					res.send("1");
						
				});
				
			}else{
						
				res.send('Kullanıcı Adı veya Şifre Hatalı!');
				
				
			}
			
		});
		
	
	
});

router.get('/Cikis-Yap', function(req, res){
	delete req.session.kisi;

	req.flash('success_msg', 'Tekrar Bekleriz.');

	res.redirect('/Giris-Yap');
});

router.post("/sifreGuncelle",function(req,res){
	
	var sifre=req.body.sifre;
    var yenisifre1=req.body.yenisifre;
	var yenisifre2=req.body.yenisifre2;
	var id=req.session.kisi;

		if(yenisifre1!=yenisifre2){
			res.send("YENİ ŞİFRELER EŞLEŞMİYOR!");
		}else{

			User.count({"_id":id,"password":sifre},function(err,say){

			if(say!=0){
				
				User.update({"_id":id},{$set:{"password":yenisifre1}},function(err,sonuc){

					if(err){
						res.send("ŞİFRE GÜNCELLENİRKEN BİR HATA OLUŞTU!");
					}else{
						res.send('ŞİFRENİZ BAŞARIYLAR GÜNCELLENMİŞTİR');
					}

				});


				}else{
					res.send("ESKİ ŞİFRENİZ YANLIŞ!");
				}

			});

		}



});

module.exports = router;