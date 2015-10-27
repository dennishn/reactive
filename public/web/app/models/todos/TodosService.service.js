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
			collection: []
		};

		Socket.on('todos:pushSingle', function(todo) {
			console.info('Recieving from Server - todos:pushSingle');

			var keepGoing = true;

			for(var i = 0, l = service.collection.length; i < l; i++) {
				if(keepGoing) {
					if(service.collection[i]._id === todo._id) {
						console.info('Record found - updating');
						service.collection[i] = todo;
						keepGoing = false;
					}
				}

			}

			if(keepGoing) {
				console.info('Record not found - pushing to collection');
				service.collection.push(todo);
			}
		});

		Socket.on('todos:pushList', function(todos) {
			console.info('Recieving from Server - todos:pushList');

			service.collection = todos;
		});

		Socket.on('todos:retractSingle', function(id) {
			console.info('Recieving from Server - todos:retractSingle');

			for(var i = 0, l = service.collection.length; i < l; i++) {
				if(service.collection[i]._id === id) {
					console.info('Record found - updating');
					service.collection.splice(i, 1);
				}
			}

		});

		return service;

		function getList() {

			var deferred = $q.defer();

			$http.get(baseUrl)
				.then(function getTodosListSuccess(results) {
					service.collection = results.data;
					deferred.resolve(service.collection);
				})
				.catch(function getTodosListError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function getSingle(id) {

			var deferred = $q.defer();

			$http.get(baseUrl + '/' + id)
				.then(function getTodoSuccess(result) {
					deferred.resolve(result.data);
				})
				.catch(function getTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function create(todo) {

			var deferred = $q.defer();

			$http.post(baseUrl, todo)
				.then(function createTodoSuccess(result) {
					deferred.resolve(result.data);
				})
				.catch(function createTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function update(todo) {

			var deferred = $q.defer();

			$http.put(baseUrl + '/' + todo._id, todo)
				.then(function createTodoSuccess(result) {
					deferred.resolve(result.data);
				})
				.catch(function createTodoError(err) {
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function remove(id) {

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

		function _findById(id) {

		}
	}

})();
