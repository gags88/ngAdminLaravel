(function() {

	'use strict';

	angular
		.module('adminApp')
		.controller('AuthController', AuthController);


	function AuthController($auth, $state, $scope, $http, $rootScope) {
		var vm = this;
		$scope.loginError=false;
    $scope.loginErrorText='';
		vm.login = function() {
			var credentials = {
				email: vm.email,
				password: vm.password
			}
			// Use Satellizer's $auth service to login
			$auth.login(credentials).then(function(data) {
				// If login is successful, get User Information
				return $http.get('/api/authenticate');
			}, function(error) {
				$scope.loginError = true;
				error.data.error ? $scope.loginErrorText = error.data.error : $scope.loginErrorText = 'Invalid Credentials';
			}).then(function(response) {
					if(typeof response != "undefined"){
						var user = JSON.stringify(response.data.user);
						localStorage.setItem('user', user);
						$rootScope.authenticated = true;
						$rootScope.currentUser = response.data.user;
						$scope.loginError = false;
						$scope.loginErrorText = '';
						$state.go('dashboard');
					}
			});;
		}

	}

})();
