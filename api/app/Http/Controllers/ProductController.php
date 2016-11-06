<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Product;
use App\Subproduct;
use App\Http\Utils\ErrorManager;

class ProductController extends Controller
{
    public function create(Request $request)
	{
        $product = new Product;
        $product->name = $request->name;	
        $product->description = $request->description;	
        $product->slug = $request->slug;	

		if (!$this->validateProductInput($product)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        if (Product::whereSlug($request->slug)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided product slug is not unique.');
        }

        try {
        	$product->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Query exception while saving to database.');
        }

        return response($product);
	}

	public function delete($id)
	{
		if ($id == 1) {
			return ErrorManager::error400(ErrorManager::$INTERNAL_VIOLATION, 'Can not delete generic product.');
		}
		$product = Product::find($id);
		if ($product == null) {
        	return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'Product does not exist.');
		}
		$product->delete();
	}

	public function view()
	{
		return response(Product::all());
	}

	public function viewById($id)
	{
		$product = Product::find($id);
		$subproducts = Subproduct::where('product_id', $id)->get();
		$product->subproducts = $subproducts;

		return $product;
	}

	public function update(Request $request)
	{
		$product = Product::find($request->id);
		$product->name = $request->name;	
        $product->description = $request->description;	
        $product->slug = $request->slug;	
        $product->expires_on = $request->expires_on;	

		if (!$this->validateProductInput($product) && empty($request->id)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        if (Product::whereSlug($request->slug)->first()->id != $request->id) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided product slug is not unique.');
        }

        try {
        	$product->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Invalid payload. Please check date format and unique fields.');
        }

        return response($product);
	}

	private function validateProductInput(Product $product)
	{
		if (empty($product->name) || empty($product->description) || empty($product->slug)) {
			return false;
		} else {
			return true;
		}
	}
}
