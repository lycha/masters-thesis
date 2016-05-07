<?php
/**
* Displays API docs by Swagger
*/
Route::get("/api-docs", function() { return Redirect::to("/swagger-ui/dist/index.html"); });

/**
* Needs to be called to install app and specify configuration.
* 
*/
Route::post('/install', 'InstallController@index');
Route::get('/run-migrations', 'InstallController@runMigrations');
Route::post('/init-roles', 'RolesController@create');
Route::post('/init-permissions', 'PermissionsController@create');

//Route::get('/install/generate', 'InstallController@generateEnv');
//Route::get('/install/test-db', 'InstallController@testDb');
//Route::get('/install/run-migrations', 'InstallController@runMigrations');
//Route::get('/install/setup-users', 'InstallController@setupUsers');

Route::get('/', function () {
    return App::abort(404);
});

Route::group(['prefix' => 'api/v1'], function()
{

    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    /**
    * Authenticates user and returns Auth token
    * body:
    * {
    *    "email": "username@domain.pl",
    *    "password": "secret"
    * }
    * 
    * returns: 
    * {"token":"eyJ0eXAiOiJKV1QiLCJhbGci6Lcij8XmkXPWypDb5N1dRyUH6xXS0nInYpO5BaCfoEs"}
    */

    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::get('logout', 'AuthenticateController@logout');

    Route::post('/user/create', [
        'uses' => 'UserController@create',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.user']);

    Route::delete('/user/delete/{id}', [
        'uses' => 'UserController@delete',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.user']);

            Route::get('save-lead', 'LeadsController@index');
});
