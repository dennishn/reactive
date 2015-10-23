(function () {
	'use strict';

	angular
		.module('socket')
		.factory('Socket', Socket);

	/* @ngInject */
	function Socket(socketFactory) {
		/*jshint validthis: true */

		var schema = {
			text: '',
			completed: false
		};

		var Todo = function(data) {

			angular.extend(schema, data);

		};

		return Todo;

	}

})();
