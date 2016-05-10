<?php

Route::get('/', function () {
    return App::abort(404);
});

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
Route::post('/init-permissions', 'PermissionsController@create');
Route::post('/init-roles', 'RolesController@create');

Route::group(['prefix' => 'api/v1'], function()
{

    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::get('logout', 'AuthenticateController@logout');

    //////////////**********USERS**************////////////
    //create new user
    Route::post('/users', [
        'uses' => 'UserController@create',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.user']);

    //delete user by id
    Route::delete('/users/{id}', [
        'uses' => 'UserController@delete',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.user']);

    //get all users
    Route::get('/users', [
        'uses' => 'UserController@view',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.user']);

    //////////////**********LEADS**************////////////
    //create new lead
    Route::post('/leads', [
        'uses' => 'LeadController@create',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.lead']);

    //delete lead by id
    Route::delete('/leads/{id}', [
        'uses' => 'LeadController@delete',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.lead']);

    //get all leads
    Route::get('/leads/', [
        'uses' => 'LeadController@view',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.lead']);

    //////////////**********CAMPAIGNS**************////////////
    Route::post('/campaigns', [
        'uses' => 'CampaignController@create',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.campaign']);

    Route::delete('/campaigns/{id}', [
        'uses' => 'CampaignController@delete',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.campaign']);

    Route::get('/campaigns/', [
        'uses' => 'CampaignController@view',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.campaign']);

    Route::put('/campaigns/{id}', [
        'uses' => 'CampaignController@update',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.campaign']);

    //////////////**********CUSTOMERS**************////////////
    Route::post('/customers', [
        'uses' => 'CustomerController@create',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.customer']);

    Route::delete('/customers/{id}', [
        'uses' => 'CustomerController@delete',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.customer']);

    Route::get('/customers/', [
        'uses' => 'CustomerController@view',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.customer']);

    Route::put('/customers/{id}', [
        'uses' => 'CustomerController@update',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'update.customer']);

    //////////////**********ENTITY**************////////////
    Route::post('/entities', [
        'uses' => 'EntityController@create',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.entity']);

    Route::delete('/entities/{id}', [
        'uses' => 'EntityController@delete',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.entity']);

    Route::get('/entities/', [
        'uses' => 'EntityController@view',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.entity']);

    Route::put('/entities/{id}', [
        'uses' => 'EntityController@update',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'update.entity']);

    //////////////**********PRODUCT**************////////////
    Route::post('/products', [
        'uses' => 'ProductController@createProduct',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.product']);

    Route::delete('/products/{id}', [
        'uses' => 'ProductController@deleteProduct',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.product']);

    Route::get('/products/', [
        'uses' => 'ProductController@viewProducts',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.product']);

    Route::put('/products/{id}', [
        'uses' => 'ProductController@updateProduct',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'update.product']);

    //////////////**********SUBPRODUCT**************////////////
    Route::post('/products/{product-id}/subproducts', [
        'uses' => 'ProductController@createSubproduct',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'create.product']);

    Route::delete('/products/{product-id}/subproducts/{id}', [
        'uses' => 'ProductController@deleteSubproduct',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'delete.product']);

    Route::get('/products/{product-id}/subproducts', [
        'uses' => 'ProductController@viewSubproducts',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'view.product']);

    Route::put('/products/{product-id}/subproducts/{id}', [
        'uses' => 'ProductController@updateSubproduct',
        'middleware' => ['jwt.auth', 'acl'], 
        'can' => 'update.product']);
});
