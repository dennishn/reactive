(function () {
	'use strict';

	angular
		.module('TodosModelService')
		.factory('TodoFactory', TodoFactory);

	/* @ngInject */
	function TodoFactory() {
		/*jshint validthis: true */

		var schema = {
			title: '',
			text: '',
			completed: false
		};

		return function(data) {

			var model = angular.extend(schema, data);

			return model;

		};

	}

})();
