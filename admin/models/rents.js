var mongoose = require('mongoose');

// User Schema
var RentSchema = mongoose.Schema({
	saha_id: {
		type: String
	},
	kisi_id: {
		type: String
	},
	kisi_isim: {
		type: String
	},
	saha_isim: {
		type: String
	},
	saha_fiyat: {
		type: Number
	},
	tarih: {
		type: String
	},
	saat: {
		type: String
	},
	kiralama_saati:{
		type: String
	}
});

var Rents = module.exports = mongoose.model('rents', RentSchema);

module.exports.createRent = function(newRent, callback){
	newRent.save(callback);
}