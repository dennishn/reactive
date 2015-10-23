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
			'nvd3',
			'application',
			'index',
			'socket',
			'TodosService',
			/* ---> Do not delete this comment (ngImports) <--- */
	]);
})();