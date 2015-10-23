(function () {
	'use strict';

	angular
		.module('socket')
		.factory('Socket', Socket);

	/* @ngInject */
	function Socket(socketFactory) {
		/*jshint validthis: true */

		var serverUrl = 'http://localhost:8080';

		var ioSocket = io.connect(serverUrl);

		var socket = socketFactory({
			ioSocket: ioSocket
		});

		return socket;

	}

})();
