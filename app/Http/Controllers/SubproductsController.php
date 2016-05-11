<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Subproduct;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Utils\ErrorManager;

class SubproductsController extends Controller
{
    public function create(Request $request)
	{
        $subproduct = new Subproduct;
        $subproduct->product_id = $request->product_id;	
        $subproduct->name = $request->name;	
        $subproduct->description = $request->description;	
        $subproduct->slug = $request->slug;	

		if (!$this->validateSubproductInput($subproduct)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        if (Subproduct::whereSlug($request->slug)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided subproduct slug is not unique.');
        }

        try {
        	$subproduct->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Invalid payload.');
        }

        return response($subproduct);
	}

	private function validateSubproductInput(Subproduct $subproduct)
	{
		if (empty($subproduct->name) || empty($subproduct->product_id) || empty($subproduct->description) || empty($subproduct->slug)) {
			return false;
		} else {
			return true;
		}
	}
}
