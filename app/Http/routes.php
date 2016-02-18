<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get("/api-docs", function() { return Redirect::to("/swagger-ui/dist/index.html"); });

Route::post('/install', 'InstallController@index');
Route::get('/run-migrations', 'InstallController@runMigrations');
Route::post('/init-roles', 'UserController@addRoles');
//Route::get('/install/generate', 'InstallController@generateEnv');
//Route::get('/install/test-db', 'InstallController@testDb');
//Route::get('/install/run-migrations', 'InstallController@runMigrations');
//Route::get('/install/setup-users', 'InstallController@setupUsers');

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'api'], function()
{
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::get('logout', 'AuthenticateController@logout');

    Route::group([
              'is' => 'admin',
			  'middleware' => ['jwt.auth', 'acl']], 
		function () {
		    Route::get('save-lead', 'LeadsController@index');
		    Route::post('create-user', 'UserController@createNewUser');
	});
});
