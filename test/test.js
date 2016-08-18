import chai from 'chai';
import dbDriver from '../server/drivers/dbDriver';
import mongoose from 'mongoose';

let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();

describe('dbDriver', () => {
	
	const userDriver = new dbDriver('userModel');

	before((done) => {

		mongoose.connect('mongodb://root:root@ds153705.mlab.com:53705/brocken_leg', (err) => {

			if (err) {

				done(err);
				console.log(`Error:  + ${err}`);

			} else {

				console.log('We are connect to DB');

			}

		});
		
		userDriver.deleteField({ id: 4 })
			.then(() => {

				done();

			})
			.catch((err) => {
				
				done(err);
				
			});

	});

	let user = {

		id: 4,
		nickname: 'test',
		picture: 'https://s.gravatar.com/avatar/test.png',
		name: 'test@ukr.net',
		email: 'test@ukr.net',
		sub: 'auth0|test'

	};

	describe('#createField()', () => {

		it('should create user and return object', (done) => {

			userDriver.createField(user)
				.then((newUser) => {
					
					expect(newUser.id).to.eql(user.id);
					done();

				})
				.catch((err) => {

					done(err);

				});
			
		});

	});

	describe('#readField()', () => {

		it('should read user', (done) => {

			userDriver.readOne({ id: 4 })
				.then((newUser) => {

					expect(newUser.id).to.eql(user.id);
					done();

				})
				.catch((err) => {

					done(err);

				});

		});

	});

	describe('#readAll()', () => {

		it('should read all user and return array', (done) => {

			userDriver.readAll()
				.then((users) => {

					expect(users).to.be.an('array');
					done();

				})
				.catch((err) => {

					done(err);

				});

		});

		it('should read all user and contain our user', (done) => {

			userDriver.readAll()
				.then((users) => {

					let tmp = null;

					users.map((_user) => {

						if (_user.id == user.id) tmp = true;

					});

					if (tmp === true) {

						done();

					} else {

						throw new Error('some');

					}


				})
				.catch((err) => {

					done(err);

				});

		});

	});

	describe('#readPaginate', () => {

		it('should return a list of users with paginate', (done) => {

			userDriver.readPaginate(1, 3)
				.then((users) => {
					
					expect(users.docs).to.have.lengthOf(3);
					done();

				})
				.catch(() => {

					done(err);

				});

		});

	});
	
	describe('#updateField', () => {

		user.nickname = 'newTest';

		it('should update user', (done) => {

			userDriver.updateField({ id: 4 }, user)
				.then((newUser) => {
					
					expect(newUser.nickname).to.equal(user.nickname);
					done();

				})
				.catch(() => {

					done(err);

				});

		});

	});
	
	describe('#deleteField', () => {

		it('should delete user', (done) => {

			userDriver.deleteField({ id: 4 })
				.then((deleteUser) => {

					expect(deleteUser.id).to.equal(user.id);
					done();

				})
				.catch(() => {

					done(err);

				});

		});
		
	});

});

