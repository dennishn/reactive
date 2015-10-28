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

		var Todo = function(data) {
			// Default properties
			angular.extend(this, schema);

			this.lastModified = Date.now();

			// Merge with server-side data
			angular.extend(this, data);
		};

		Todo.prototype.update = function(data) {
			for(var key in schema) {
				if(data.hasOwnProperty(key) && key !== '_id') {
					this[key] = data[key];
				}
			}
			this.lastModified = Date.now();
		};

		return Todo;

	}

})();
