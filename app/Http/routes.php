<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::group(['prefix' => 'api'], function(){
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::post('register', 'AuthenticateController@register');
    Route::resource('todo', 'TodoController');
});

Route::group(['prefix' => 'admin'], function (){
	Route::any('{path?}', function(){
        return view("admin.index");
    })->where("path", ".+");
});

// Using different syntax for Blade to avoid conflicts with Jade.
Blade::setContentTags('[[', ']]');
Blade::setEscapedContentTags('<[[[', ']]]');
