<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Utils\ErrorManager;
use App\Customer;
use DB;

class CustomerController extends Controller
{
    public function create(Request $request)
	{
		if (Customer::where('email', $request->email)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$EMAIL_NOT_UNIQUE, 'Customer with provided email already exists.');
        }

		$customer = new Customer;
        $customer->lead_id = $request->lead_id;
        $customer->email = $request->email;
        $customer->setFields($request->fields);

        if (!$this->validateCustomerInput($customer)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        $customer->save();
        return response($customer);
	}

	public function delete(Request $request)
	{
		# code...
	}

	public function view(Request $request)
	{
		return response()->json(['customers'=>Customer::all()]);
	}

	public function update(Request $request)
	{
		# code...
	}

	public function count(Request $request)
	{
		if (!$this->validateCountInput($request)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 
		$count = "";
		//if entity_id is not provided return for all entities
		if (empty($request->entity)) {
			$count = DB::table('lead_customer')
				->whereBetween('customer_created_at',[$request->date_from, $request->date_to])
				->where('product_id', $request->product)
				->count();
		} else {
			$count = DB::table('lead_customer')
				->whereBetween('customer_created_at',[$request->date_from, $request->date_to])
				->where('entity_id', $request->entity)
				->where('product_id', $request->product)
				->count();
		}
		
		return response()->json(['customers'=>['count'=>$count]]);
	}

	public function validateCountInput(Request $request)
	{
		if (empty($request->date_from) || empty($request->date_to) || empty($request->product)) {
			return false;
		} else {
			return true;
		}
	}

	private function validateCustomerInput(Customer $customer)
	{
		if (empty($customer->lead_id) || empty($customer->email) || empty($customer->fields)) {
			return false;
		} else {
			return true;
		}
	}
}
