## Token-Based Authentication for AngularJS and Laravel Tutorial with Satellizer

This is the code for the AngularJS and Laravel token-based authentication tutorial on [Scotch.io](https://scotch.io/)

### Installation

Clone the repository and install the Laravel vendor files

	composer install

Once your .env file is setup with your database connection parameters, run the migrations and seed the database

	php artisan migrate
	php artisan make:seeder UsersTableSeeder (If UsersTableSeeder is not found in database/seeds)
	php artisan db:seed


### Branches

The Scotch branch has all the code that is covered in the first part of the tutorial on [Scotch.io](https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps).

### Changes:

* Dynamic Title
* Angular Material Design
* More stuff is under progress....
