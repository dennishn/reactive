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
		.module('reactive')
		.run(run);

	function run(nTranslate, $state, $rootScope, $localStorage) {
		var didRunTranslate = false;

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			console.table(toState);
			if(!didRunTranslate) {


				if(!$localStorage.translate) {
					event.preventDefault();
					nTranslate.init().then(function() {
						$state.go(toState.name, toParams);
					});
				} else {
					event.preventDefault();
					nTranslate.init().then(function() {
						$state.go(toState.name, toParams);
					});
				}

				didRunTranslate = true;
			}
		});
	}
})();
