/**
 * The very rudimentral REST setup with CRUD routes.
 *
 * Ideas to improve this:
 *
 * - Move dev helpers to another file
 * - Add defensive checks to methods
 * - Add query parameters / filters
 * - Add bulk endpoints for manipulating [0-N] documents
 * - Expand the Todo model with more fields
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

function createTodo(res, todo) {

	var _todo = new Todo(todo);

	_todo.save(todo, function(err, _todo) {

		if(err) {
			res.send(err);
		}

		res.json(_todo);

	});

}

function updateTodo(res, id, todo) {

	Todo.findById(id, function(err, _todo) {

		_todo.title = todo.title;
		_todo.text = todo.text;
		_todo.completed = todo.completed;

		_todo.save(function(err) {

			if(err) {
				res.send(err);
			}

			res.send(_todo);

		});

	});

}

function deleteTodo(res, id) {

	return Todo.findById(id, function (err, todo) {

		todo.remove(function (err) {

			if (err) {
				res.send(err);
			}

			res.send('');

		});
	});

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

module.exports = function(app) {

	app.get('/api/todos', function(req, res) {

		getTodos(res);

	});

	app.get('/api/todos/:todo_id', function(req, res) {

		getTodo(res, req.params.todo_id);

	});

	app.post('/api/todos', function(req, res) {

		createTodo(res, req.body);

	});

	app.put('/api/todos/:todo_id', function(req, res) {

		updateTodo(res, req.params.todo_id, req.body);

	});

	app.delete('/api/todos/:todo_id', function(req, res) {

		deleteTodo(res, req.params.todo_id);

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