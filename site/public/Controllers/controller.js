var halisaha = angular.module('benimsaham', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});


halisaha.controller('form', ['$scope', '$http', function($scope, $http) {

	var Yenile=function(){

		$http.get("/sahalarim").success(function(response){
			
				$scope.sahalarim=response;
			
		});

		$http.get("/fields").success(function(response){
			$scope.sahalar=response;
		});
	
		$http.get("/kisi").success(function(response){
			$scope.kisi=response;
		});

	}
	
	Yenile();

	$scope.Iptal=function(id){

		$http.delete("/sahalarim/"+id).success(function(response){
			
		});
		Yenile();
	}

	

	$scope.Gorus=function(){

		$http.post("/gorusEkle",$scope.gorus).success(function(response){
			$scope.gorus_sonuc=response;
			$scope.gorus="";
		});
		Yenile();
	}


	$scope.Kirala=function(saha_id,saha_isim,saha_fiyat,kira_tarih,kira_saat){
		

		var veriler={"saha_id":saha_id,"saha_isim":saha_isim,"saha_fiyat":saha_fiyat,"kira_tarih":new Date(kira_tarih),"kira_saat":kira_saat};
		if($.trim(kira_tarih).length==0){
			$scope.kirala_sonuc="LÜTFEN BİR TARİH SEÇİNİZ!";
		}else if($.trim(kira_saat).length==0){
			$scope.kirala_sonuc="LÜTFEN BİR SAAT SEÇİNİZ!";
		}else{
			$http.post("/kirala",veriler).success(function(response){
					$scope.kirala_sonuc=response;
					Yenile();
			});
		}
	

	}

	$scope.Guncelle=function(sifre,eski1,eski2){

		var veriler={"sifre":sifre,"yenisifre":eski1,"yenisifre2":eski2};
		if($.trim(sifre).length==0 || $.trim(eski1).length==0 || $.trim(eski2).length==0){
			$scope.yenileme_sonuc="BOŞ ALAN BIRAKMAYINIZ!";
		}else{
			$http.post("/sifreGuncelle",veriler).success(function(response){
				$scope.yenileme_sonuc=response;
				$scope.aaa=""; 
				Yenile();
				Yenile();
			});
			Yenile();
		}
		

	}


	$scope.GirisYap=function(kadi,sifre){
		var veriler={"username":kadi,"password":sifre};
		
		if($.trim(kadi).length==0 || $.trim(sifre).length==0){
			$scope.giris_sonuc="BOŞ ALAN BIRAKMAYINIZ!";
		}else{
			$http.post("/Giris-Yap",veriler).success(function(response){
				if(response=="1"){
					$scope.uye="";
					$scope.giris_sonuc="GİRİŞ BAŞARIYLA YAPILDI.";
					window.location.href = '/';
				}else{
					$scope.giris_sonuc=response;
				}
				
				
			});
		}

	}


	$scope.KayitOl=function(kadi,sifre,sifre2,email,telefon){
		var veriler={"username":kadi,"password":sifre,"password2":sifre2,"email":email,"phone":telefon};

		if($.trim(kadi).length==0 || $.trim(sifre).length==0 || $.trim(sifre2).length==0 || $.trim(email).length==0 || $.trim(telefon).length==0){
			$scope.kayit_sonuc="BOŞ ALAN BIRAKMAYINIZ!";
		}else{
			$http.post("/Kayit-Ol",veriler).success(function(response){
				if(response=="1"){
					$scope.gg="";
					$scope.kayit_sonuc="KAYIT BAŞARIYLA TAMAMLANDI.";
					window.location.href = '/Giris-Yap';
				}else{
					$scope.kayit_sonuc=response;
				}
				
				
			});
		}

	}

	

}]);
