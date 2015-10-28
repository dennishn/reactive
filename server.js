var express = require('express');

var app		= express();
var server	= require('http').Server(app);
var io		= require('socket.io')(server);

var mongoose = require('mongoose');
var database = require('./server/config/database');
mongoose.connect(database.url);

var morgan   = require('morgan');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var pkg  	= require('./package.json');

var port 	= process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/web/app'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));

// allow CORS
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

require('./server/routes/todos.js')(app, io);

server.listen(port);
console.log('Express listening on port: ', port);