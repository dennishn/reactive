(function() {
	'use strict';

	angular.module('todos')
		/* @ngInject */
		.config(function ($stateProvider) {

			var TodosRoot = {
				name: 'application.todos',
				abstract: true,
				views: {
					'application@application': {
						templateUrl: 'modules/todos/todos.template.html',
						controller: 'Todos',
						controllerAs: 'todos'
					}
				}
			};

			var TodosList = {
				name: 'application.todos.list',
				url: '/',
				views: {
					'todoView@application.todos': {
						templateUrl: 'modules/todos/list/list.template.html',
						controller: 'TodosListController',
						controllerAs: 'todosList'
					}
				}
			};

			var TodosSingle = {
				name: 'application.todos.single',
				url: '/todos/:id',
				views: {
					'todoView@application.todos': {
						templateUrl: 'modules/todos/single/single.template.html',
						controller: 'TodosSingleController',
						controllerAs: 'todosSingle'
					}
				},
				resolve: {
					todoId: function($stateParams) {
						return $stateParams.id || undefined;
					}
				}
			};

			$stateProvider.state(TodosRoot);
			$stateProvider.state(TodosList);
			$stateProvider.state(TodosSingle);
		});
})();
