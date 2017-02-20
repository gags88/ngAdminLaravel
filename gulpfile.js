var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 npm install --global gulp-cli
 npm install gulp
 npm install gulp laravel-elixir
 npm install gulp laravel-elixir-ng-annotate
 npm install gulp laravel-elixir-vue-2
 npm install gulp gulp-uglify
 gulp --prodution - to minify
 */
var angularPlugins = ['angular/angular.min.js', 'angular/angular-route.min.js','angular/angular-animate.min.js','angular/angular-aria.min.js','angular/angular-messages.min.js','angular/angular-material.min.js','angular/ngStorage.js','angular/angular-resource.js','angular/angular-ui-router.min.js','angular/satellizer.js', 'angular/md-datatable.js'];

var cssAdminPlugins = ['angular/angular-material.min.css','angular/md-datatable.css', 'admin/css/admin.css','admin/css/helpers.css'];

var appScripts = ['scripts/admin/js/config.js','scripts/admin/js/directives.js','views/admin/**/*.js'];

elixir(mix => {
   /*mix.sass('app.scss')
      .webpack('app.js');*/
     mix.styles(cssAdminPlugins,'public/styles/css/adminapp.css','public/styles/');
     mix.scripts(angularPlugins,'public/scripts/js/angular.js','public/scripts');
     mix.scripts(appScripts,'public/scripts/js/adminapp.js','public');

});

/*
gulp.task('scripts-watch',function() {
 gulp.watch('views/admin/**//*.js', [appScripts]);
});
*/
