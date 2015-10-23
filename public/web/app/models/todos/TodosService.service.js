(function () {
	'use strict';

	angular
		.module('TodosService')
		.service('TodosService', TodosService);

	/* @ngInject */
	function TodosService($http, $q) {
		/*jshint validthis: true */

		var baseUrl = 'http://localhost:8080/api/todos';

		return {
			getList: getList,
			getSingle: getSingle,
			create: create
		};

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
	}

})();
