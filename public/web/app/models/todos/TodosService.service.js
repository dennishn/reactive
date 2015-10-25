(function () {
	'use strict';

	angular
		.module('TodosModelService')
		.service('TodosService', TodosService);

	/* @ngInject */
	function TodosService($http, $q, lodash, TodoFactory) {
		/*jshint validthis: true */

		var baseUrl = 'http://localhost:8080/api/todos';

		var service = {
			getList: getList,
			getSingle: getSingle,
			create: create,
			update: update,
			remove: remove
		};

		return service;

		function getList() {

			var deferred = $q.defer();

			$http.get(baseUrl)
				.then(function getTodosListSuccess(results) {
					deferred.resolve(results.data);
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
	}

})();
