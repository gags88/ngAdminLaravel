(function() {
	'use strict';

	angular.module('adminApp').controller('ClientLoginsController', ClientLoginsController);

  function ClientLoginsController($http) {

		var vm = this;

		vm.add = function(){

			var data = {
          name: vm.name,
          ip: vm.ip,
					username: vm.username,
					password: vm.password
      };

			var config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
      }

			$http.post('/api/addClient', vm, config).success(function(response) {
					//vm.users = response.users;
			}).error(function(error) {
					vm.error = error;

			});
		}

  }

})();
