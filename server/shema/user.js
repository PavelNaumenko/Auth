import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

let userSchema = mongoose.Schema({

	sub: {

		type: String,
		default: ''

	}

}, { versionKey: false });

userSchema.plugin(autoIncrement.plugin, 'user');

export default mongoose.model('user', userSchema);
