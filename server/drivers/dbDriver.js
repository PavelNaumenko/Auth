import UserModel from '../shemas/user';

export default class dbDriver {

	constructor(model) {

		switch (model) {

			case 'userModel':
				this.model = UserModel;
				break;

			default:
				console.log('Incorrect model!');


		}

	}

	readAll() {

		return new Promise((resolve, reject) => {

			this.model.find((err, users) => {

				(err) ? reject(err) : resolve(users);

			});

		});

	}

	readOne(criteria) {

		return new Promise((resolve, reject) => {

			this.model.findOne(criteria, (err, user) => {

				(err) ? reject(err) : resolve(user);

			});

		});

	}

	createField(data) {

		return new Promise((resolve, reject) => {


			if (data !== '') {

				this.model.create(data, (err, data) => {

					(err) ? reject(err) : resolve(data);

				});

			} else {

				reject('empty data');

			}

		});

	}
	
	updateField(_id, data) {

		return new Promise((resolve, reject) => {

			if (data !== '') {

				this.model.findOneAndUpdate(_id, data, (err) => {

					(err) ? reject(err) : resolve();

				});

			} else {

				reject('Try to update user with empty params');

			}

		});

	}

}

