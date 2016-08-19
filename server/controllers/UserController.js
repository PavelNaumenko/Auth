import User from '../models/User';

class UserController {

	showAll(req, res) {

		User.readAllUsers()
			.then((users) => {

				res.status(200).send(users);

			})
			.catch((result) => {

				res.status(result.status).send({ message: result.err });

			});

	}

	showOne(req, res) {
		
		const id = req.params.id || '';
		
		User.readUser({ id })
			.then((user) => {
				
				res.status(200).send({ user });

			})
			.catch((result) => {
				
				res.status(result.status).send({ message: result.err });

			});

	}

	showPaginate(req, res) {
		
		const page = req.query.page;
		const limit = req.query.limit;
		
		User.readUserWithPaginate(page, limit)
			.then((users) => {
				
				res.status(200).send(users);
				
			})
			.catch((result) => {

				res.status(result.status).send({ message: result.err });
				
			});
		
	}
	
	logIn(req, res) {

		const sub = req.user.sub;
		const profile = req.body.profile;

		User.login(sub, profile)
			.then((data) => {

				res.status(200).json({ data });

			})
			.catch((result) => {
				
				res.status(result.status).send({ message: result.err });

			});

	}
	
	update(req, res) {
		
		const id = req.params.id || '';
		const sub = req.user.sub;
		const updating = req.body.updating;
		
		User.checkAccessAndUpdate(id, sub, updating)
			.then((data) => {
				
				res.status(200).send(data);
				
			})
			.catch((result) => {
				
				res.status(result.status).send({ message: result.err });
				
			});
		
	}

	delete(req, res) {

		const id = req.params.id || '';
		const sub = req.user.sub;

		User.checkAccessAndDelete(id, sub)
			.then((data) => {

				res.status(200).send(data);

			})
			.catch((result) => {

				res.status(result.status).send({ message: result.err });

			});

	}

}

export default new UserController();
