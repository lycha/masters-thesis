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

	public static function error400($errorCode, $errorTitle)
	{
		return response()->json(['error' => ['code' => $errorCode, 
				'title' => $errorTitle]], 400);
	}
}