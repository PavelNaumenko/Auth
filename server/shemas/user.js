import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import mongoosePaginate from 'mongoose-paginate';

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
userSchema.plugin(mongoosePaginate);

export default mongoose.model('user', userSchema);
