(function() {

	'use strict';

	angular
		.module('adminApp')
		.controller('UserController', UserController);
	function UserController($http) {
		var vm = this;
		vm.users;
    $http.get('/api/authenticate').then(function(response) {
			//alert(JSON.stringify(response));
      vm.users = response.data.users;
    },function(error){
      console.log(error);
    })
	}

})();
