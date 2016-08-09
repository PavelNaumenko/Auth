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
// protect routes
app.use(expressJWT({ secret: 'secret' }).unless({ path: ('/') }));

/**
 * Require frontend dir public file
 */

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, '../view'));

});

app.post('/login', (req, res) => {



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
