(function () {
	'use strict';

	angular
		.module('todos')
		.controller('TodosSingleController', TodosSingleController);

	/* @ngInject */
	function TodosSingleController(Socket, TodosService, TodoFactory, todoId, $state) {
		/*jshint validthis: true */
		var vm = this;

		vm.todo = {};
		vm.errors = {};

		vm.isLoading = true;
		vm.isEditTodo = angular.isDefined(todoId);

		vm.saveTodo = saveTodo;
		vm.deleteTodo = deleteTodo;

		activate();

		function activate() {
			if(vm.isEditTodo) {
				_getTodo(todoId)
					.then(function getSingleSuccess(todo) {
						vm.todo = todo;
					})
					.catch(_errorHandler)
					.finally(_loadingStateHandler);
			} else {
				vm.todo = new TodoFactory();
				_loadingStateHandler();
			}
		}

		function saveTodo() {

			_loadingStateHandler();

			if(vm.isEditTodo) {
				_updateTodo()
					.then(_succesStateHandler)
					.catch(_errorHandler)
					.finally(_loadingStateHandler);
			} else {
				_createTodo()
					.then(_succesStateHandler)
					.catch(_errorHandler)
					.finally(_loadingStateHandler);
			}
		}

		function deleteTodo() {

			vm.isLoading = true;

			if(!vm.isEditTodo) {
				return;
			}

			_deleteTodo(todoId)
				.then(_succesStateHandler)
				.catch(_errorHandler)
				.finally(_loadingStateHandler);

		}

		function _getTodo(id) {
			return TodosService.getSingle(id);
		}

		function _createTodo() {
			return TodosService.create(vm.todo);
		}

		function _updateTodo() {
			return TodosService.update(vm.todo);
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

		function _succesStateHandler() {
			//Socket.emit('todos:pullList', true);
			$state.go('application.todos.list');
		}
	}

})();
