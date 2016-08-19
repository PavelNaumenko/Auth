import chai from 'chai';
import dbDriver from '../../server/drivers/dbDriver';
import fetch from 'node-fetch';
require('../../server/entry');

let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();

describe('User API', () => {

	before((done) => {

		userDriver.deleteField({ id: 10 })
			.then(() => {

				done();

			})
			.catch((err) => {

				done(err);

			});

	});

	const userDriver = new dbDriver('userModel');

	const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Bhc2hrYTk1LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2I2ZDU0ZTNmYTRlODlhMjllOWQ3OWMiLCJhdWQiOiJtdDl2VWNIc0VaQjJoVXZVZlVEcXVDMXl3akVPam5NSiIsImV4cCI6MTQ3MTYzNTk1MCwiaWF0IjoxNDcxNTk5OTUwfQ.O5psODiSVYbTf96czxOIgpDX8z67iN5uFdoxUT1rX0M';

	let user = {

		id: 10,
		nickname: 'test',
		picture: 'https://s.gravatar.com/avatar/test.png',
		name: 'test@ukr.net',
		email: 'test@ukr.net',
		sub: 'auth0|57b6d54e3fa4e89a29e9d79c'
		
	};
	
	describe('/POST create()', () => {

		let result;

		it('it should answer with status 200', (done) => {

			fetch('http://localhost:3000/users/new', {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ profile: user })

			}).then(res => {

				result = res;
				expect(res.status).to.equal(200);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should answer with status 401', (done) => {

			fetch('http://localhost:3000/users/new', {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ''
				},
				body: JSON.stringify({ profile: user })

			}).then(res => {

				expect(res.status).to.equal(401);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return the user data', (done) => {

			result.json().then(data => {

				expect(data.data.newUser.id).to.equal(user.id);
				done();

			});

		});

	});
	
	describe('/GET showAll()', () => {

		let result;

		it('it should answer with status 200', (done) => {

			fetch('http://localhost:3000/all', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then(res => {

				result = res;
				expect(res.status).to.equal(200);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should answer with status 401', (done) => {

			fetch('http://localhost:3000/all', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ''
				}

			}).then(res => {

				expect(res.status).to.equal(401);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return array of users', (done) => {

			result.json().then(data => {

				expect(data).to.be.an('array');
				done();

			});

		});

	});

	describe('/GET showOne()', () => {

		let result;

		it('it should answer with status 200', (done) => {

			fetch('http://localhost:3000/user/10', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then(res => {

				result = res;
				expect(res.status).to.equal(200);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should answer with status 401', (done) => {

			fetch('http://localhost:3000/user/10', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ''
				}

			}).then(res => {

				expect(res.status).to.equal(401);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return user', (done) => {

			result.json().then(data => {

				expect(data.user.id).to.equal(user.id);
				done();

			});

		});

		it('it should return status 404', (done) => {

			fetch('http://localhost:3000/user/9999999', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then(res => {

				expect(res.status).to.equal(404);
				done();

			}).catch((err) => {

				done(err);

			});

		});

	});
	
	describe('/GET showPaginate()', () => {

		let result;

		it('it should answer with status 200', (done) => {

			fetch('http://localhost:3000/users?page=2&limit=3', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then(res => {

				result = res;
				expect(res.status).to.equal(200);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should answer with status 401', (done) => {

			fetch('http://localhost:3000/users?page=2&limit=3', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ''
				}

			}).then(res => {

				expect(res.status).to.equal(401);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return arrays with length of 3', (done) => {

			result.json().then(data => {

				expect(data.docs).to.have.lengthOf(3);
				done();

			});

		});

		it('it should return arrays with length of 0', (done) => {

			fetch('http://localhost:3000/users?page=99999&limit=3', {

				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then(res => {

				res.json().then(data => {

					expect(data.docs).to.have.lengthOf(0);
					done();

				});

			}).catch((err) => {

				done(err);

			});

		});
		
	});
	
	describe('/PUT update()', () => {

		let result;

		it('it should answer with status 200', (done) => {

			user.nickname = 'newTest';

			let updating = {
				
				nickname: user.nickname
				
			};

			fetch('http://localhost:3000/user/10', {

				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ updating })

			}).then((res) => {

				result = res;
				expect(res.status).to.equal(200);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should answer with status 401', (done) => {

			fetch('http://localhost:3000/user/10', {

				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ''
				},
				body: JSON.stringify({ profile: user })

			}).then((res) => {

				expect(res.status).to.equal(401);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return updated user', (done) => {

			result.json().then(data => {

				expect(data.nickname).to.equal(user.nickname);
				done();

			});

		});

		it('it should return status 403', (done) => {

			fetch('http://localhost:3000/user/2', {

				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ profile: user })

			}).then(res => {

				expect(res.status).to.equal(403);
				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('/DELETE delete()', () => {

		let result;

		it('it should answer with status 401', (done) => {

			fetch('http://localhost:3000/user/10', {

				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ''
				}

			}).then((res) => {

				expect(res.status).to.equal(401);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return status 403', (done) => {

			fetch('http://localhost:3000/user/2', {

				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then(res => {

				expect(res.status).to.equal(403);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should answer with status 200', (done) => {

			fetch('http://localhost:3000/user/10', {

				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}

			}).then((res) => {

				result = res;
				expect(res.status).to.equal(200);
				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('it should return deleted user', (done) => {

			result.json().then(data => {

				expect(data.id).to.equal(user.id);
				done();

			});

		});

	});

});
