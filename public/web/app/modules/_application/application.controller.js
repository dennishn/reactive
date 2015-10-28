(function () {
	'use strict';

	angular
		.module('application')
		.controller('Application', Application);

	/* @ngInject */
	function Application(TodosService, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.userCount = 0;
		$scope.$watch(function() {
			return TodosService.activeUsers;
		}, function(count) {
			vm.userCount = count;
		});

	}

})();
