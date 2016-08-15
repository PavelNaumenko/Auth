import UserController from '../controllers/UserController';

export default [

	{

		url: '/all',
		action: UserController.showAll,
		method: 'get'

	},

	{

		url: '/user/:id',
		action: UserController.showOne,
		method: 'get'

	},

	{

		url: '/users/new',
		action: UserController.logIn,
		method: 'post'

	}

];

