const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameHistorySchema = new Schema({
	user_id: { type: String, require: true },
	win: { type: Number },
	draw: { type: Number },
	lose: { type: Number },
	date_time: { type: Date }
})

module.exports = mongoose.model('History', GameHistorySchema);