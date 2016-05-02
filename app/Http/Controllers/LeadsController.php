<?php

use Chrisbjr\ApiGuard\Http\Controllers\ApiGuardController;

class LeadsController extends ApiGuardController
{

    public function __construct()
   {
       // Apply the jwt.auth middleware to all methods in this controller
       // except for the authenticate method. We don't want to prevent
       // the user from retrieving their token if they don't already have it
   }

   public function index()
   {
   	return $this->response()->json(['success' => 'you are admin']);
   }

}