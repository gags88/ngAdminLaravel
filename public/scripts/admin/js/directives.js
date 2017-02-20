var directivesApp = angular.module('app.directives',[]);

directivesApp.directive("thekodePreloader", function(){
  return{
    restrict : 'AEC',
		replace : true,
    template : '<div flex ng-show="loading" class="loading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>'
  }
});
