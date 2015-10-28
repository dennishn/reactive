(function () {
	'use strict';

	angular
		.module('TodosModelService')
		.service('TodosService', TodosService);

	/* @ngInject */
	function TodosService($http, $q, lodash, TodoFactory, Socket) {
		/*jshint validthis: true */

		var baseUrl = 'http://localhost:8080/api/todos';

		var service = {
			getList: getList,
			getSingle: getSingle,
			create: create,
			update: update,
			remove: remove,
			collection: [],
			activeUsers: 0
		};

		Socket.on('todos:pushSingle', function(todo) {
			console.info('Recieving from Server - todos:pushSingle');

			var i = _findIndexById(todo._id);

			if(i > -1) {
				service.collection[i].update(todo);
			} else {
				service.collection.push(todo);
			}

		});

		Socket.on('todos:pushList', function(todos) {
			console.info('Recieving from Server - todos:pushList');

			service.collection = todos;
		});

		Socket.on('todos:retractSingle', function(id) {
			console.info('Recieving from Server - todos:retractSingle');

			var i = _findIndexById(id);

			if(i > -1) {
				service.collection.splice(i, 1);
			}

		});

		Socket.on('todos:userCount', function(count) {
			service.activeUsers = count;
		});

		return service;

		function getList() {
			console.info('HTTP Query from Server - /todos');

			var deferred = $q.defer();

			$http.get(baseUrl)
				.then(function getTodosListSuccess(results) {

					var i = 0,
						l = results.data.length;

					var _todos = [];

					for(; i < l; i++) {
						var todo = new TodoFactory(results.data[i]);
						_todos.push(todo);
					}

					service.collection = _todos;

					deferred.resolve(service.collection);
				})
				.catch(function getTodosListError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function getSingle(id) {
			console.info('HTTP Query from Server - /todos/:id');

			var deferred = $q.defer();

			$http.get(baseUrl + '/' + id)
				.then(function getTodoSuccess(result) {

					var i = _findIndexById(result.data._id);

					var todo;

					if(i > -1) {
						todo = service.collection[i];
					} else {
						todo = new TodoFactory(result.data);
						service.collection.push(todo);
					}

					deferred.resolve(todo);
				})
				.catch(function getTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function create(todo) {
			console.info('HTTP Post to Server - /todos');

			var deferred = $q.defer();

			$http.post(baseUrl, todo)
				.then(function createTodoSuccess(result) {

					var _todo = new TodoFactory(result.data);
					service.collection.push(_todo);

					deferred.resolve('');
				})
				.catch(function createTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function update(todo) {
			console.info('HTTP Post to Server - /todos/:id');

			var deferred = $q.defer();

			$http.put(baseUrl + '/' + todo._id, todo)
				.then(function updateTodoSuccess(result) {

					var i = _findIndexById(todo._id);

					if(i > -1) {
						service.collection[i].update(todo);
					}

					deferred.resolve('');
				})
				.catch(function updateTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function remove(id) {
			console.info('HTTP Delete to Server - /todos/:id');

			var deferred = $q.defer();

			$http.delete(baseUrl + '/' + id)
				.then(function createTodoSuccess(result) {
					deferred.resolve(result.data);
				})
				.catch(function createTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function _findIndexById(id) {

			return lodash.findIndex(service.collection, function(t) {
				return t._id === id;
			});
		}
	}

})();
