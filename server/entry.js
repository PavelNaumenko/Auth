import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressJWT from 'express-jwt';

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

/**
 * error handler
 */

app.use((err, req, res, next) => {

	console.log('1');

	if (err.name === 'UnauthorizedError') {

		console.log('I am here!');
		res.status(401).send({ message: 'invalid token...' });

	}

});

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

	console.log(req.user);

	//Here write data to db.

	res.status(200).send({ message: 'User write to db' });

});

/**
 * Listen server
 */

let server = http.createServer(app);

server.listen(port, () => {

	console.log(`// API running at :${port} port //`);

});

/**
 * Node error handler
 */

process.on('uncaughtException', (err) => {

	console.log(`CAUGHT EXCEPTION: ${err.message}`);

});
