var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/benimsaham");

db=mongoose.connection;

db.once('open', function() {

  console.log("MongoDB bağlantısı başarılı.");

});

db.on('error', function(err,docs){

	console.log("MongoDB bağlantısı başarısız!");

});
