var theKodeapp = angular.module('theKodeapp', ['ui.router', 'satellizer','ngResource','ngMaterial','ngAnimate','ngMessages', 'ngStorage','md.data.table']);

theKodeapp.config(['$mdThemingProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$authProvider', '$provide', '$locationProvider', function($mdThemingProvider, $httpProvider, $stateProvider, $urlRouterProvider, $authProvider, $provide, $locationProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '700',
        'hue-1': '100',
        'hue-2': '600',
        'hue-3': 'A100'
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('red', {
        'default': '500'
    });
  }
]);
