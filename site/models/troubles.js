var mongoose = require('mongoose');

// User Schema
var TroubleSchema = mongoose.Schema({
	isim: {
		type: String,
		index:true
	},
	email: {
		type: String
	},
	telefon: {
		type: String
	},
	sorun:{
		type:String
	},
	bakildimi:{
		type:String
	}
});

var Troubles = module.exports = mongoose.model('troubles', TroubleSchema);

module.exports.createTrouble = function(newTrouble, callback){
	newTrouble.save(callback);
}