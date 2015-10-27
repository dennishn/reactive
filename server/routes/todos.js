/**
 * The very rudimentral REST setup with CRUD routes.
 *
 * Ideas to improve this:
 *
 * - Move dev helpers to another file
 * - Add defensive checks to methods
 * - Add query parameters / filters
 * - Add bulk endpoints for manipulating [0-N] documents
 *
 */

var Todo = require('../models/todo');
var Faker = require('Faker');

function getTodos(res) {

	Todo.find(function(err, todos) {

		if(err) {
			res.send(err);
		}
		res.json(todos);

	});

}

function getTodo(res, id) {

	Todo.findById(id, function(err, todo) {

		if(err) {
			res.send(err);
		}

		res.json(todo);

	});

}

function createTodo(res, socket, todo) {

	var _todo = new Todo(todo);

	_todo.save(todo, function(err, _todo) {

		if(err) {
			res.send(err);
		}

		res.json(_todo);
		_emitSingle(socket, _todo);

	});

}

function updateTodo(res, socket, id, todo) {

	Todo.findById(id, function(err, _todo) {

		_todo.title = todo.title;
		_todo.text = todo.text;
		_todo.completed = todo.completed;

		_todo.save(function(err) {

			if(err) {
				res.send(err);
			}

			_emitSingle(socket, _todo);
			res.send(_todo);

		});

	});

}

function deleteTodo(res, socket, id) {

	return Todo.findById(id, function (err, todo) {

		todo.remove(function (err) {

			if (err) {
				res.send(err);
			}

			_retractSingle(socket, id);
			res.send('');

		});
	});

}

function _emitSingle(socket, todo) {
	_emit(socket, 'pushSingle', todo, true);
}

function _emitList(socket) {
	Todo.find(function() {
		_emit(socket, 'pushList', true);
	});
}

function _retractSingle(socket, id) {
	_emit(socket, 'retractSingle', id, true);
}

function _retractList(socket) {
	_emit(socket, 'retractList', '', true);
}

function _emit(socket, eventName, payload, isBroadcast) {
	if(isBroadcast) {
		// to other sockets (clientA > server > clientB)
		socket.broadcast.emit('todos:' + eventName, payload);
	} else {
		// to own socket (clientA > server > clientA)
		socket.emit('todos:' + eventName, payload);
	}
}

/*
	Dev Specific helpers
 */

function bulkCreate(res, count) {

	var _todos = [];

	for(var i = 0; i < count; i++) {

		var _todo = {
			title: Faker.Lorem.sentence(),
			text: Faker.Lorem.paragraphs(),
			completed: false
		};

		_todos.push(_todo);
		var newTodo = new Todo(_todo);

		newTodo.save(function(err) {

			if(err) {
				res.send(err);
			}

		});

	}

	res.json(_todos);

}

function bulkDelete(res) {

	Todo.remove(function(err) {

		if(err) {
			res.send(err);
		}

		res.send('');

	});

}

module.exports = function(app, io) {

	var _socket;

	io.on('connection', function(socket) {
		_socket = socket;
	});

	app.get('/api/todos', function(req, res) {

		getTodos(res);

	});

	app.get('/api/todos/:todo_id', function(req, res) {

		getTodo(res, req.params.todo_id);

	});

	app.post('/api/todos', function(req, res) {

		createTodo(res, _socket, req.body);

	});

	app.put('/api/todos/:todo_id', function(req, res) {

		updateTodo(res, _socket, req.params.todo_id, req.body);

	});

	app.delete('/api/todos/:todo_id', function(req, res) {

		deleteTodo(res, _socket, req.params.todo_id);

	});

	/*
		Dev Specific helpers
	 */

	app.post('/api/todos/bulk/create/:todo_count', function(req, res) {

		bulkCreate(res, req.params.todo_count);

	});

	app.delete('/api/todos/bulk/delete', function(req, res) {

		bulkDelete(res);

	});

};