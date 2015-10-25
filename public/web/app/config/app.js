(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name reactive
	 * @description
	 * # reactive
	 *
	 * Main module of the application.
	 */
	angular
		.module('reactive', [
			'DEBUG_ENV',
			'API_ENDPOINTS',
			'nCore',
			'ui.router',
			'config',
			'angular-loading-bar',
			'cgBusy',
			'angulartics',
			'angulartics.google.analytics',
			'mm.foundation',
			'ngAnimate',
			'ngSanitize',
			'ngTouch',
			'ngStorage',
			'btford.socket-io',
			'ngLodash',
			'nvd3',
			'application',
			'socket',
			'TodosModelService',
			'todos',
			/* ---> Do not delete this comment (ngImports) <--- */
	]);
})();