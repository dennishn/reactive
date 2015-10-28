(function () {
	'use strict';

	angular
		.module('todos')
		.controller('TodosListController', TodosListController);

	/* @ngInject */
	function TodosListController(TodosService, Socket, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.todos = [];
		vm.errors = {};

		vm.isLoading = true;

		vm.updateTodo = updateTodo;
		vm.deleteTodo = deleteTodo;

		$scope.$watchCollection(function() {
			return TodosService.collection;
		}, function(newCollection) {
			console.info('Collection updated through watcher');
			vm.todos = newCollection;
		});

		activate();

		function activate() {

			_getTodos()
				.then(_successStateHandler)
				.catch(_errorHandler)
				.finally(_loadingStateHandler);
		}

		function updateTodo(todo) {

			_loadingStateHandler();

			_updateTodo(todo)
				.then(_successStateHandler)
				.catch(_errorHandler)
				.finally(function() {
					_loadingStateHandler();
					todo.isSyncing = false;
				});
		}

		function deleteTodo(todo) {

			_loadingStateHandler();

			_deleteTodo(todo._id)
				.then(_getTodos)
				.then(_successStateHandler)
				.catch(_errorHandler)
				.finally(_loadingStateHandler);

		}

		function _getTodos() {
			return TodosService.getList();
		}

		function _updateTodo(todo) {
			todo.isSyncing = true;
			return TodosService.update(todo);
		}

		function _deleteTodo(id) {
			return TodosService.remove(id);
		}

		function _errorHandler(err) {
			vm.errors = angular.extend(vm.errors, err);
		}

		function _loadingStateHandler() {
			vm.isLoading = !vm.isLoading;
		}

		function _successStateHandler() {

		}
	}

})();
