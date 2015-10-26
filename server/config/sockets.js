var statsStream = require('../streams/stats');

module.exports = function(io) {

	var self = this;

	io.on('connection', function(socket) {

		console.log('Client socket connection established');

		socket.emit('connection_established', 'Connection established');

	});

};