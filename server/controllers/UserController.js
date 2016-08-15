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
		const sub = req.user.sub;
		
		User.readUser(sub, id)
			.then((user) => {
				
				res.status(200).send({ message: user });

			})
			.catch((result) => {
				
				res.status(result.status).send({ message: result.err });

			});

	}

	showPaginate(req, res) {
		
		const page = req.params.page;
		const limit = req.params.limit;
		
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

				console.log(result.err);
				res.status(result.status).send({ message: result.err });

			});

	}

}

export default new UserController();
