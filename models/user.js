const mongoose = require('mongoose');
const Profile = require('./user_profile')
const History = require('./game_history')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	username: { type: String },
	password: { type: String },
	email: { type: String, required: true, unique: true },
	type_user: { type: String, default: 1 }, //regular user
	user_profile: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
	game_history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
})

UserSchema.plugin(passportLocalMongoose);

UserSchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await Profile.deleteMany({
			_id: {
				$in: doc.user_profile
			}
		})
		await History.deleteMany({
			_id: {
				$in: doc.game_history
			}
		})
	}
})

module.exports = mongoose.model('User', UserSchema);