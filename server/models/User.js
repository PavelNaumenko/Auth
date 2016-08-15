import dbDriver from '../drivers/dbDriver';

const userDriver = new dbDriver('userModel');

class User {
	
	readAllUsers() {

		return new Promise((resolve, reject) => {

			userDriver.readAll()
				.then((users) => {

					resolve(users);

				})
				.catch((err) => {

					reject({ err, status: 400 });

				});

		});
		
	}

	readUser(sub, id) {

		return new Promise((resolve, reject) => {

			userDriver.readOne({ sub })
				.then((user) => {

					if (id == user._id) {

						resolve(user);

					} else {

						reject({ err: 'Вы не имеета права доступа', status: 403 });

					}


				})
				.catch((err) => {

					reject({ err, status: 400 });

				});

		});

	}

	readUserWithPaginate(page, limit) {
		
		return new Promise((resolve, reject) => {

			userDriver.readPaginate(page, limit)
				.then((users) => {

					resolve(users);

				})
				.catch((err) => {

					reject({ err, status: 400 });

				});
			
		});
		
	}
	
	parceProfile(sub, profile) {

		return {
			
			sub,
			email: profile.email,
			name: profile.name,
			picture: profile.picture,
			nickname: profile.nickname
			
		};
		
	}
	
	findBySub(sub) {
		
		return new Promise((resolve, reject) => {
			
			userDriver.readOne({ sub })
				.then((user) => {
					
					resolve(user);
					
				})
				.catch((err) => {
					
					reject(err);
					
				});
			
		});
		
	}
	
	updateUser(sub, newUser) {
		
		return new Promise((resolve, reject) => {
			
			userDriver.updateField(sub, newUser)
				.then(() => {
					
					resolve();
					
				})
				.catch((err) => {
					
					reject(err);
					
				});
			
		});
		
	}
	
	createUser(params) {
		
		return new Promise((resolve, reject) => {

			userDriver.createField(params)
				.then((user) => {

					resolve(user);

				})
				.catch((err) => {

					reject(err);

				});

		});
		
	}
	
	login(sub, profile) {
		
		let params = this.parceProfile(sub, profile);
		
		return new Promise((resolve, reject) => {
			
			this.findBySub(sub)
				.then((user) => {

					if (user) {

						let newUser = Object.assign(user, params);
						
						this.updateUser({ sub }, newUser)
							.then(() => {
								
								resolve({ newUser, message: 'Вход выполнен успешно!' });
								
							})
							.catch((err) => {

								reject({ err, status: 400 });
								
							});
						
					} else {

						this.createUser(params)
							.then((newUser) => {

								resolve({ newUser, message: 'Вы успешно зарегистрировались!' });
								
							})
							.catch((err) => {

								reject({ err, status: 400 });
								
							});
						
					}
					
				})
				.catch((err) => {
					
					reject({ err, status: 400 });
					
				});
			
		});
		
	}

}

export default new User();

