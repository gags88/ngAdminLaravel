<!doctype html>
<html ng-app="theKodeapp" ng-cloak>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="shortcut icon" type="image/x-icon" href="images/logo/theKodeLogo.ico" />
        <base href="/">
        <title>the Kode</title>
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
        <link rel="stylesheet" href="styles/css/theKodeapp.css">
    </head>
    <body layout="column">
      <div class="nav">
        <md-content>
          <md-toolbar class="md-hue-8">
            <div class="md-toolbar-tools">
              <md-button class="md-icon-button" aria-label="Menu" hide-gt-sm>
                <i class="material-icons">&#xE5D2;</i>
              </md-button>
              <div class="logo"><img src="images/logo/whitetheKodeLogo.png" alt="thKode" class="img-responsive" /></div>
            </div>
          </md-toolbar>
        </md-content>
      </div>

      <div class="quote" flex layout layout-align="center center" layout-padding>[[Inspiring::quote()]]</div>

      <script type="text/javascript" src="scripts/js/angular.js"></script>
      <script type="text/javascript" src="scripts/js/theKodeapp.js"></script>
    </body>
</html>
