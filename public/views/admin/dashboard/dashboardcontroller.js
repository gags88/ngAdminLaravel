(function() {

	'use strict';

	angular
		.module('adminApp')
		.controller('DashboardController', DashboardController);
	function DashboardController($http) {
		var vm = this;
		vm.users;
		vm.error;
		vm.getUsers = function() {
			// This request will hit the index method in the AuthenticateController
			// on the Laravel side and will return the list of users
			$http.get('/api/authenticate').success(function(response) {
					vm.users = response.users;
			}).error(function(error) {
					vm.error = error;
					function sendback(){
					  window.location = 'login';
					}
					setTimeout(sendback, 1000);
			});
		}
	}

})();
