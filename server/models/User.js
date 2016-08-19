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

	readUser(criteria) {

		return new Promise((resolve, reject) => {

			userDriver.readOne(criteria)
				.then((user) => {

					(user) ? resolve(user) : reject({ err: 'Page not found', status: 404 });


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

		let user = {

			sub,
			email: profile.email,
			name: profile.name,
			picture: profile.picture,
			nickname: profile.nickname

		};

		if (profile.id) {

			user.id = profile.id;

		}

		return user;
		
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
	
	updateUser(criteria, newUser) {
		
		return new Promise((resolve, reject) => {
			
			userDriver.updateField(criteria, newUser)
				.then((data) => {
					
					resolve(data);
					
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
	
	checkAccessAndUpdate(id, sub, profile) {

		return new Promise((resolve, reject) => {
			
			this.isHaveAccess(id, sub)
				.then((answer) => {
					
					if (answer) {

						this.updateUser({ sub }, profile)
							.then((user) => {

								resolve(user);
								
							})
							.catch((err) => {

								reject({ err, status: 400 });
								
							});
						
					} else {
						
						reject({ err: 'You havent access to this page', status: 403 });
						
					}
					
				})
				.catch((err) => {

					reject({ err, status: 400 });
					
				});
			
		});
		
	}
	
	isHaveAccess(id, sub) {
		
		return new Promise((resolve, reject) => {

			this.readUser({ sub })
				.then((user) => {

					resolve(id == user.id);

				})
				.catch((err) => {

					reject({ err, status: 400 });

				});
			
		});
		
	}
	
	checkAccessAndDelete(id, sub) {

		return new Promise((resolve, reject) => {

			this.isHaveAccess(id, sub)
				.then((answer) => {

					if (answer) {

						this.deleteUser({ sub })
							.then((user) => {

								resolve(user);

							})
							.catch((err) => {

								reject({ err, status: 400 });

							});

					} else {
						
						reject({ err: 'You havent access to this page', status: 403 });

					}

				})
				.catch((err) => {

					reject({ err, status: 400 });

				});

		});
		
	}
	
	deleteUser(criteria) {

		return new Promise((resolve, reject) => {

			userDriver.deleteField(criteria)
				.then((data) => {

					resolve(data);

				})
				.catch((err) => {

					reject(err);

				});

		});
		
	}

}

export default new User();

