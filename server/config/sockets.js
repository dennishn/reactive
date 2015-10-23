var statsStream = require('../streams/stats');

module.exports = function(io) {

	var interval;

	io.on('connection', function(socket) {

		console.log('Client socket connection established');

		socket.emit('connection_established', 'Connection established');

		socket.on('poll_stream', function() {

			interval = setInterval(function() {

				socket.emit('stream', statsStream.streamStats());

			}, 500);

		});

		socket.on('cancel_stream', function() {

			clearInterval(interval);

		});

	});

};