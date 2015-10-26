var Todo = require('../models/todo');

module.exports = function(io) {

	io.on('connection', function(socket) {

		socket.on('todos:pullList', function(broadcast) {
			console.log('todos:pullList');
			Todo.find(function(err, todos) {
				if(err) {
					_errorEmitter(socket, err);
				}
				_emitter(socket, 'pushList', todos, broadcast);
			});
		});

	});

	function _emitter(socket, eventName, payload, broadcast) {
		if(broadcast) {
			socket.broadcast.emit('todos:' + eventName, payload);
		} else {
			socket.emit('todos:' + eventName, payload);
		}
	}

	function _errorEmitter(socket, err) {
		socket.emit('todos:error', err);
	}
};