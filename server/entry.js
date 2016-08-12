import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressJWT from 'express-jwt';
import mongoose from 'mongoose';
import userModel from './shema/user';

mongoose.connect('mongodb://root:root@ds153705.mlab.com:53705/brocken_leg', (err) => {

	if (err) {

		console.log(`Error:  + ${err}`);

	} else {

		console.log('We are connect to DB');

	}

});

const app = express();
const port = 3000;

/**
 * Access headers to server
 */

app.all('/*', (req, res, next) => {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');

	next();

});

/**
 * Connecting node dependencies to express
 */

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../view')));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const secret = 'T_XI2yY3H5JTbNnYjlzvbIDs9bwWXkZRSO90Eq9x1dcO7z3xJY9bGqr2Z567jg3B';
const authenticate = expressJWT({

	secret: new Buffer(secret, 'base64'),
	audience: 'mt9vUcHsEZB2hUvUfUDquC1ywjEOjnMJ'

});

app.use('/login', authenticate);
app.use('/private', authenticate);

/**
 * Require frontend dir public file
 */

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, '../view'));

});

app.post('/login', (req, res) => {

	const token = req.headers.authorization;
	const sub = req.user.sub;

	let promise = new Promise((resolve, reject) => {

		userModel.findOne({ sub }, (err, user) => {

			if (err) {

				reject(err);

			}

			if (user) {

				resolve({ message: 'Вход выполнен успешно',
					user });

			}

			if (!user) {

				let innerPromise = new Promise((resolve, reject) => {

					userModel.create({ sub }, (err, user) => {

						(err) ? reject(err) : resolve({ message: 'Вы зарегистрированы',
						user });

					});

				});

				innerPromise
					.then((result) => {

						resolve(result);

					})
					.catch((err) => {

						reject(err);

					});

			}

		});

	});

	promise
		.then((result) => {

			res.status(200).send(result);

		})
		.catch((err) => {

			res.status(400).send(err);

		});

});

/**
 * Listen server
 */

let server = http.createServer(app);

server.listen(port, () => {

	console.log(`// API running at :${port} port //`);

});

/**
 * error handler
 */

app.use((err, req, res, next) => {

	if (err.name === 'UnauthorizedError') {

		res.status(401).send({ message: 'invalid token...' });

	}

});

/**
 * Node error handler
 */

process.on('uncaughtException', (err) => {

	console.log(`CAUGHT EXCEPTION: ${err.message}`);

});
