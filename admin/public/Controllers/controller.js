var benimsaham = angular.module('benimsaham', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});


benimsaham.controller('admin', ['$scope', '$http', function($scope, $http) {

        var Yenile=function(){

            $http.get("/fields").success(function(response){
                $scope.sahalar=response;
                if($scope.sahalar==""){
                    $scope.fields_sonuc="Halısahanız Bulunmamaktadır!";
                }
            });

            $http.get("/troubles").success(function(response){
                $scope.gorusler=response;
                if($scope.gorusler==""){
                    $scope.trouble_sonuc="Görüşünüz Bulunmamaktadır!";
                }
            });

            $http.get("/traoublescount").success(function(response){
                $scope.traoublescount=response;
            });

            $http.get("/Kazanc").success(function(response){
                
                    if(response==""){
                        $scope.kazanc_yok="0 TL";
                        $scope.kazanc_sonuc="Maalesef Kazancımız Yok!";
                    }else{
                        $scope.kazanc=response;
                        $scope.kazanc_sonuc="Toplam Kazancımız Var";
                    }

            });

            $http.get("/users").success(function(response){
                $scope.users=response;
                if($scope.users==""){
                    $scope.users_sonuc="Kullanıcı Bulunmamaktadır!";
                }
            });

             $http.get("/uye_sayi").success(function(response){
                
                if(response=="0"){
                    $scope.user_count="0";
                    $scope.user_count_sonuc="Malesef Üyemiz Yok!";
                }else{
                    $scope.user_count=response;
                    $scope.user_count_sonuc="Üyemiz Var";
                }
            });

            $http.get("/saha_sayi").success(function(response){
                
                if(response=="0"){
                    $scope.saha_count="0";
                    $scope.saha_count_sonuc="Malesef Halısahamız Yok!";
                }else{
                    $scope.saha_count=response;
                    $scope.saha_count_sonuc="Halısahamız Var";
                }
            });

            $http.get("/rents").success(function(response){
                $scope.rents=response;
                if($scope.rents==""){
                    $scope.rents_sonuc="Hiçbir Halısaha Kiralanmamıştır!";
                }
            });

            //ADMİN İŞLEMLERİ

            $http.get("/admin").success(function(response){
                $scope.admin=response;
            });

            //RAPORLAMA

             $http.get("/rents2").success(function(y){
               var x = {};
                var i = y.length;
                while(i--) {
                    var sHash = y[i].saha_isim.toString();
                    if (typeof(x[sHash]) == "undefined") 
                        x[i] = [];
                    x[i].push(y[i]);
                }
                console.log(x);
                $scope.gunluk=x;
            });

        }

        Yenile();

        //GÖRÜŞ İŞLEMLERİ

        $scope.Sil=function(id){
            $http.delete("/troublesdelete/"+id).success(function(response){});
            Yenile();
        }

        $scope.TumGorusSil=function(){
            $http.delete("/gorusler_sil").success(function(response){});
            Yenile();
        }
        
        //KULLANICI İŞLEMLERİ

        $scope.Kullanici_Sil=function(id){
            $http.delete("/usersdelete/"+id).success(function(response){});
            Yenile();
        }

        $scope.Kullanici_Ekle=function(kadi,sifre,email,telefon,yetki){

            if($.trim(kadi).length==0 || $.trim(sifre).length==0 || $.trim(email).length==0 || $.trim(telefon).length==0 || $.trim(yetki).length==0){
                $scope.kullaniciekle_sonuc="Boş Alan Bırakmayınız!";
            }else{
                $http.post("/users_add",$scope.kullanici).success(function(response){
                    if(response=="1"){
                        $scope.kullaniciekle_sonuc="Lütfen! Farklı Bir Kullanıcı Adı Deneyiniz.";
                    }else{
                        $scope.kullaniciekle_sonuc=response;
                        $scope.kullanici="";
                    }

                });
            }
            Yenile();
        }

        $scope.UyeKadiGuncelle=function(id,kadi){
            if($.trim(kadi).length==0){
                $scope.userkadiguncelle_sonuc="Lütfen Kullanıcı Adı Giriniz!";
            }else{
                var veriler={"id":id,"kadi":kadi};
                $http.put("/uyekadiguncelle",veriler).success(function(response){
                    if(response=="1"){
                         $scope.userkadiguncelle_sonuc="Lütfen Farklı Bir Kullanıcı Adı Deneyiniz!";
                    }else{
                         $scope.userkadiguncelle_sonuc=response;
                         $scope.kadi="";
                    }
                });

                Yenile();
            } 
        }

        $scope.UyeEmailGuncelle=function(id,email){
            if($.trim(email).length==0){
                $scope.useremailguncelle_sonuc="Lütfen E-Mail Adresiniz Giriniz!";
            }else{
                var veriler={"id":id,"email":email};
                $http.put("/uyeemailguncelle",veriler).success(function(response){

                    $scope.useremailguncelle_sonuc=response;
                    $scope.email="";
                    
                });

                Yenile();
            } 
        }

        $scope.UyeTelefonGuncelle=function(id,telefon){
            if($.trim(telefon).length==0){
                $scope.usertelefonguncelle_sonuc="Lütfen Telefon Numarasını Giriniz!";
            }else{
                var veriler={"id":id,"phone":telefon};
                $http.put("/uyetelefonguncelle",veriler).success(function(response){

                    $scope.usertelefonguncelle_sonuc=response;
                    $scope.telefon="";
                    
                });

                Yenile();
            } 
        }

        //KİRALAMA İŞLEMLERİ

        $scope.Kira_Sil=function(id){
            $http.delete("/rentsdelete/"+id).success(function(response){
                
            });
            Yenile();
        }

        $scope.TumKiraSil=function(){
            $http.delete("/kiralar_sil").success(function(response){});
            Yenile();
        }


        //HALISAHA İŞLEMLERİ

        $scope.Halisaha_Ekle=function(resim,isim,fiyat){

            if($.trim(resim).length==0 || $.trim(isim).length==0 || $.trim(fiyat).length==0){
                $scope.halisaha_sonuc="Boş Alan Bırakmayınız!";
            }else{
                $http.post("/saha_ekle",$scope.halisaha).success(function(response){
                    if(response=="1"){
                        $scope.halisaha_sonuc="Lütfen Farklı Bir Halısaha İsimi Yazınız.";
                    }else{
                        $scope.halisaha_sonuc=response;
                        $scope.halisaha="";
                    }
                });
            }
            Yenile();
        }

        $scope.Halisaha_Sil=function(id){
            $http.delete("/fieldsdelete/"+id).success(function(response){});
            Yenile();
        }

        $scope.SahaResimGuncelle=function(id,resim){
            if($.trim(resim).length==0){
                $scope.fieldresimguncelle_sonuc="Lütfen Resim Seçiniz!";
            }else{
                var veriler={"id":id,"resim":resim};
                $http.put("/fieldresimguncelle",veriler).success(function(response){

                    $scope.fieldresimguncelle_sonuc=response;
                    $scope.resim="";
                    Yenile();
                });

                
            } 
        }

        $scope.SahaIsimGuncelle=function(id,isim){
            if($.trim(isim).length==0){
                $scope.fieldisimguncelle_sonuc="Lütfen Saha Adını Giriniz!";
            }else{
                var veriler={"id":id,"isim":isim};
                $http.put("/fieldisimguncelle",veriler).success(function(response){

                    if(response=="1"){
                        $scope.fieldisimguncelle_sonuc="Lütfen Farklı Bir Saha Adı Giriniz!";
                    }else{
                        $scope.fieldisimguncelle_sonuc=response;
                        $scope.isim="";
                        Yenile();
                    }
                    
                });

                
            } 
        }


        $scope.SahaFiyatGuncelle=function(id,fiyat){
            if($.trim(fiyat).length==0){
                $scope.fieldfiyatguncelle_sonuc="Lütfen Saha Fiyatını Giriniz!";
            }else{
                var veriler={"id":id,"fiyat":fiyat};
                $http.put("/fieldfiyatguncelle",veriler).success(function(response){

                        $scope.fieldfiyatguncelle_sonuc=response;
                        $scope.fiyat="";
                        Yenile();
                    
                });


            } 
        }


        //ADMİN GİRİŞ

        $scope.GirisYap=function(kadi,sifre){
            var kadi1=$.trim(kadi);
            var sifre1=$.trim(sifre);

            
            if(kadi1.length==0 || sifre1.length==0){
			    $scope.giris_sonuc="Boş Alan Bırakmayınız!";
            }else{
                var veriler={"username":kadi1,"password":sifre1};
                $http.post("/Giris-Yap",veriler).success(function(response){
                    if(response=="1"){
                        $scope.admin="";
                        $scope.giris_sonuc="GİRİŞ BAŞARIYLA YAPILDI.";
                        window.location.href = '/';
                    }else{
                        $scope.giris_sonuc=response;
                    }
                    
                    
                });
            }
            

        }


        $scope.SifreGuncelle=function(sifre,sifre1,sifre2){
            var sifree=$.trim(sifre);
            var sifree1=$.trim(sifre1);
             var sifree2=$.trim(sifre2);

            
            if(sifree.length==0 || sifree1.length==0 || sifree2.length==0){
			    $scope.sifreguncelle_sonuc="Boş Alan Bırakmayınız!";
            }else{
                var veriler={"password":sifree,"password1":sifree1,"password2":sifree2};
                $http.put("/Sifre_Guncelle",veriler).success(function(response){
                    if(response=="1"){
                        $scope.admin="";
                        $scope.sifreguncelle_sonuc="ŞİFRENİZ BAŞARIYLA SIFIRLANDI.";
                        Yenile();
                    }else{
                        $scope.sifreguncelle_sonuc=response;
                    }
                    
                    
                });
            }
            
        }

        $scope.KadiGuncelle=function(kadi,kadi1,kadi2){
            var kadii=$.trim(kadi);
            var kadii1=$.trim(kadi1);
             var kadii2=$.trim(kadi2);

            
            if(kadii.length==0 || kadii1.length==0 || kadii2.length==0){
			    $scope.kadiguncelle_sonuc="Boş Alan Bırakmayınız!";
            }else{
                var veriler={"kadi":kadii,"kadi1":kadii1,"kadi2":kadii2};
                console.log(veriler);
                $http.put("/Kadi_Guncelle",veriler).success(function(response){
                    if(response=="1"){
                        $scope.admin="";
                        $scope.kadiguncelle_sonuc="KULLANICI ADINIZ BAŞARIYLA SIFIRLANDI.";
                        Yenile();
                    }else{
                        $scope.kadiguncelle_sonuc=response;
                    }
                    
                    
                });
            }
            
        }


        $scope.EmailGuncelle=function(email,email1,email2){
            var emaile=$.trim(email);
            var emaile1=$.trim(email1);
             var emaile2=$.trim(email2);

            
            if(emaile.length==0 || emaile1.length==0 || emaile2.length==0){
			    $scope.emailguncelle_sonuc="Boş Alan Bırakmayınız!";
            }else{
                var veriler={"email":emaile,"email1":emaile1,"email2":emaile2};
                console.log(veriler);
                $http.put("/Email_Guncelle",veriler).success(function(response){
                    if(response=="1"){
                        $scope.admin="";
                        $scope.emailguncelle_sonuc="E-MAİL ADRESİNİZ BAŞARIYLA SIFIRLANDI.";
                        Yenile();
                    }else{
                        $scope.emailguncelle_sonuc=response;
                    }
                    
                    
                });
            }
            
        }


        $scope.TelefonGuncelle=function(telefon,telefon1,telefon2){
            var telefone=$.trim(telefon);
            var telefone1=$.trim(telefon1);
             var telefone2=$.trim(telefon2);

            
            if(telefone.length==0 || telefone1.length==0 || telefone2.length==0){
			    $scope.telefonguncelle_sonuc="Boş Alan Bırakmayınız!";
            }else{
                var veriler={"telefon":telefone,"telefon1":telefone1,"telefon2":telefone2};
                console.log(veriler);
                $http.put("/Telefon_Guncelle",veriler).success(function(response){
                    if(response=="1"){
                        $scope.admin="";
                        $scope.telefonguncelle_sonuc="TELEFON NUMARANIZ BAŞARIYLA SIFIRLANDI.";
                        Yenile();
                    }else{
                        $scope.telefonguncelle_sonuc=response;
                    }
                    
                    
                });
            }
            
        }


        


}]);
