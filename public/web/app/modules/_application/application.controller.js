(function () {
	'use strict';

	angular
		.module('application')
		.controller('Application', Application);

	/* @ngInject */
	function Application(TodosService, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.todos = [];
		vm.isConnected = false;

		$scope.chart = [

		];
		vm.chartOptions = {
			chart: {
				type: 'sparklinePlus',
				height: 450,
				margin : {
					top: 20,
					right: 20,
					bottom: 60,
					left: 65
				},

				color: d3.scale.category10().range(),

				x: function(d, i){return i;},
				xTickFormat: function(d) {
					return d3.time.format('%x')(new Date($scope.data[d].x))
				},

			}
		};

		//Socket.on('connection_established', function(message) {
		//	console.info('io msg: ', message);
		//	vm.isConnected = true;
		//});
		//
		//Socket.on('stream', function(data) {
		//
		//	$scope.chart.push(data);
		//	console.log($scope.chart)
		//});

		vm.establishStream = function() {

			//Socket.emit('poll_stream');

		};

		vm.cancelStream = function() {

			//Socket.emit('cancel_stream');

		};

		vm.getTodosList = function() {

			TodosService.getList()
				.then(function(todos) {
					vm.todos = todos;
				});

		};

		vm.createTodo = function() {

			var _todo = {
				text: 'Do groceries',
				completed: false
			};

			TodosService.create(_todo)
				.then(function(todo) {
					vm.todos.push(todo);
				});

		};
	}

})();
