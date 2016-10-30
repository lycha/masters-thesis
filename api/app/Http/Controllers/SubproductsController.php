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

        $whereQuery = ['slug' => $request->slug, 'product_id' => $request->product_id];
        if (Subproduct::where($whereQuery)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided subproduct slug is not unique for this Product.');
        }

        try {
        	$subproduct->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Query exception while saving to database.');
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
