const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user_id: { type: String, require: true },
	first_name: { type: String },
	last_name: { type: String },
	address: { type: String },
	phone: { type: Number },
	birthdate: { type: String },
	gender: { type: String }

})

module.exports = mongoose.model('Profile', ProfileSchema);