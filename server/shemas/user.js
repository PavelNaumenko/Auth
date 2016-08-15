import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

let userSchema = mongoose.Schema({

	sub: {

		type: String,
		default: ''

	},

	email: {

		type: String,
		default: ''

	},

	name: {

		type: String,
		default: ''

	},

	picture: {

		type: String,
		default: ''

	},

	nickname: {

		type: String,
		default: ''

	}

}, { versionKey: false });

userSchema.plugin(autoIncrement.plugin, 'user');

export default mongoose.model('user', userSchema);
