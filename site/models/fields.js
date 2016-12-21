var mongoose = require('mongoose');

// User Schema
var FiledSchema = mongoose.Schema({
	isim: {
		type: String,
		index:true
	},
	fiyat: {
		type: String
	},
	resim: {
		type: String
	}
});

var Fields = module.exports = mongoose.model('fields', FiledSchema);