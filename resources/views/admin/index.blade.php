<!doctype html>
<html ng-app="adminApp" ng-cloak>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <base href="/admin/" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="shortcut icon" type="image/x-icon" href="/images/logo/favico.png" />
        <base href="/">
        <title ng-bind="$state.current.title"></title>
        <link rel="stylesheet" href="/styles/css/adminapp.css">
    </head>
    <body layout="column">
        <div ng-show="!loading" flex layout="column">
          <div ng-include="'../views/admin/topNav/topnav.html'" ng-if="$state.current.name != 'login'"></div>
          <section layout flex>
            <section ng-if="$state.current.name != 'login'" layout>
              <div ng-include="'../views/admin/sidenav/sidenav.html'" layout></div>
            </section>
            <div id="page-wrapper" flex>
                <div ui-view id="ui-view" flex></div>
            </div>
          </section>
        </div>
        <thekode-Preloader/>
    </body>
    <!-- Application Dependencies -->
    <script src="/scripts/js/angular.js"></script>
    <!-- Application Scripts -->
    <script src="/scripts/js/adminapp.js"></script>
</html>
