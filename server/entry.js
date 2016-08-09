import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressJWT from 'express-jwt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/brockenLeg', (err) => {

	if (err) {

		console.log('Error: ' + err);

	} else {

		console.log('We are connect to DB');

	}

});

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
// protect routes
// app.use(expressJWT({ secret: 'secret' }).unless({ path: ('/') }));

const secret = 'T_XI2yY3H5JTbNnYjlzvbIDs9bwWXkZRSO90Eq9x1dcO7z3xJY9bGqr2Z567jg3B';
const authenticate = expressJWT({

	secret: new Buffer(secret, 'base64'),
	audience: 'mt9vUcHsEZB2hUvUfUDquC1ywjEOjnMJ'

});

app.use('/login', authenticate);

/**
 * Require frontend dir public file
 */

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, '../view'));

});

app.post('/login', (req, res) => {

	const token = req.headers.authorization;

	console.log(req.user.sub);

	// jwt.verify(token, 'secret', (err, decoded) => {
	//
	// 	if (err) {
    //
	// 		console.log(err);
    //
	// 	} else {
    //
	// 		console.log(decoded);
	//
	// 	}
	//
	//
	// });

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
