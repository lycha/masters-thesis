<?php

namespace App\Http\Utils;

/**
* Error manager for HTTP responses
*/
class ErrorManager 
{
	public static $DATE_NOT_VALID = "DATE_NOT_VALID";
	public static $SLUG_NOT_UNIQUE = "SLUG_NOT_UNIQUE";
	public static $OBJECT_DOES_NOT_EXIST = "OBJECT_DOES_NOT_EXIST";
	public static $INVALID_PAYLOAD = "INVALID_PAYLOAD";
	public static $INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
	public static $TOKEN_CREATION_FAILED = "TOKEN_CREATION_FAILED";
	public static $USER_NOT_FOUND = "USER_NOT_FOUND";
	public static $RESOURCE_NOT_AVAILABLE = "RESOURCE_NOT_AVAILABLE";
	public static $WRITE_FILE_ERROR = "WRITE_FILE_ERROR";
	public static $DATABASE_ERROR = "DATABASE_ERROR";
	public static $MIGRATIONS_ERROR = "MIGRATIONS_ERROR";
	public static $CREATE_PERMISSIONS_FAILED = "CREATE_PERMISSIONS_FAILED";
	public static $OBJECT_DUPLICATED = "OBJECT_DUPLICATED";
	public static $OBJECT_CREATION_FAILED = "OBJECT_CREATION_FAILED";
	public static $EMAIL_NOT_UNIQUE = 'EMAIL_NOT_UNIQUE';
	public static $INTERNAL_VIOLATION = 'INTERNAL_VIOLATION';
	public static $ID_NOT_UNIQUE = 'ID_NOT_UNIQUE';

	/*
    |--------------------------------------------------------------------------
    | 400 Bad Request
    |--------------------------------------------------------------------------
    |
    */
	public static function error400($errorCode, $errorTitle)
	{
		return response()->json(['error' => ['code' => $errorCode, 
				'title' => $errorTitle]], 400);
	}

	/*
    |--------------------------------------------------------------------------
    | 401 Unauthorized
    |--------------------------------------------------------------------------
    |
    */
	public static function error401($errorCode, $errorTitle)
	{
		return response()->json(['error' => ['code' => $errorCode, 
				'title' => $errorTitle]], 401);
	}

	/*
    |--------------------------------------------------------------------------
    | 404 Not Found
    |--------------------------------------------------------------------------
    |
    */
	public static function error404($errorCode, $errorTitle)
	{
		return response()->json(['error' => ['code' => $errorCode, 
				'title' => $errorTitle]], 404);
	}

	/*
    |--------------------------------------------------------------------------
    | 410 Gone
    |--------------------------------------------------------------------------
    |
    */
	public static function error410($errorCode, $errorTitle)
	{
		return response()->json(['error' => ['code' => $errorCode, 
				'title' => $errorTitle]], 410);
	}

	/*
    |--------------------------------------------------------------------------
    | 500 Internal Server Error
    |--------------------------------------------------------------------------
    |
    */
	public static function error500($errorCode, $errorTitle)
	{
		return response()->json(['error' => ['code' => $errorCode, 
				'title' => $errorTitle]], 500);
	}
}