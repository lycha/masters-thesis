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
        $customer->entity_id = $request->entity_id;
        $customer->setFields($request->fields);

        if (!$this->validateCustomerInput($customer)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        try {
            $customer->save();
        } catch (\Illuminate\Database\QueryException $e) {
            return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Query exception while saving to database.'.$e);
        }
        return response($customer);
	}

	public function delete(Request $request)
	{
		# code...
	}

	public function view(Request $request)
	{
        $date_from = $request->date_from;
        $date_to = $request->date_to;

        $customers = Customer::all();

        if ($date_from && $date_to != null) {
            $filtered = array_filter($customers, function($k) use($date_from, $date_to){
                $datetime = explode(" ",$k->created_at);
                $date = $datetime[0];
                $time = $datetime[1];
                return $date > $date_from && $k->created_at < $date_to;
            });
            return response($filtered);
        }
        return response($customers);
        
	}

    public function download(Request $request)
    {
        $filename = "customers-".date("m-d-y:H:i:s")."csv";
        $headers = [
                'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
            ,   'Content-type'        => 'text/csv'
            ,   'Content-Disposition' => 'attachment; filename='.$filename
            ,   'Expires'             => '0'
            ,   'Pragma'              => 'public'
        ];

        if (!$this->validateCountInput($request)) {
            return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
        } 

        $where = "WHERE \"customer_created_at\" BETWEEN '".$request->date_from."' AND '".$request->date_to." 23:59:59'";

        if (!empty($request->product)) {
            $where = $where." AND \"product_id\" = (SELECT id FROM products WHERE slug = '".$request->product."')"; 
        }
        if (!empty($request->entity)) {
            $where = $where." AND \"customer_entity_id\" = (SELECT id FROM entities WHERE slug = '".$request->entity."')"; 
        }
        if (!empty($request->utm_campaign)) {
            $where = $where." AND \"utm_campaign_id\" = (SELECT id FROM campaigns WHERE slug = '".$request->utm_campaign."')";
        }

        $dump = DB::select("select * from \"lead_customer\" ".$where);

        $listHstore = json_decode(json_encode($dump), true);
        $list;
        foreach ($listHstore as $row) { 
            $newRow = $row;
            $newRow = array_merge(json_decode($this->hstore2json($row['fields']), true), $newRow);
            unset($newRow['fields']);
            $list[] = $newRow;
        }

        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function() use ($list) 
        { 
            $FH = fopen('php://output', 'w');
            foreach ($list as $row) { 
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return \Response::stream($callback, 200, $headers);

    }

    private function hstore2json($hstore)
    {
        $json = str_replace("=>", ":", "{".$hstore."}");
        $json = stripslashes($json);
        return $json;
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

        $where = "WHERE \"customer_created_at\" BETWEEN '".$request->date_from."' AND '".$request->date_to." 23:59:59'";

        if (!empty($request->product)) {
            $where = $where." AND \"product_id\" = (SELECT id FROM products WHERE slug = '".$request->product."')"; 
        }
        if (!empty($request->entity)) {
            $where = $where." AND \"customer_entity_id\" = (SELECT id FROM entities WHERE slug = '".$request->entity."')"; 
        }
        if (!empty($request->utm_campaign)) {
            $where = $where." AND \"utm_campaign_id\" = (SELECT id FROM campaigns WHERE slug = '".$request->utm_campaign."')";
        }

        $count = DB::select("select count (*) from \"lead_customer\" ".$where);
        return $count;
	}

	public function getCustomersAnalysis(Request $request)
    {
        if (!$this->validateAnalysisInput($request)) {
            return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
        }

        $utm_sources = DB::select("SELECT DISTINCT utm_source FROM utm_source_medium");
        $coalesce = "";
        $sum = "";
        foreach ($utm_sources as $utm_source) {
            $source = preg_replace('/[^a-zA-Z0-9_.]/', '_', $utm_source->utm_source);
            $coalesce = $coalesce.", coalesce(".$source.",0) AS ".$source;
            $sum = $sum.", sum(case when utm_source  = '".
                $source.
                "' then 1 else 0 end) as ".
                $source;
        }

        $where = "WHERE product_id = (SELECT id FROM products WHERE slug = '".$request->product."')";
        if (!empty($request->entity)) {
            $where = $where." AND customer_entity_id = (SELECT id FROM entities WHERE slug = '".$request->entity."')"; 
        }
        if (!empty($request->utm_campaign)) {
            $where = $where." AND utm_campaign_id = (SELECT id FROM campaigns WHERE slug = '".$request->utm_campaign."')";
        }

        $select = "SELECT
            date::date".$coalesce."
            FROM
             generate_series(
               '".$request->date_from."'::timestamp,
               '".$request->date_to."'::timestamp,
               '1 day') AS date
            LEFT OUTER JOIN
              (SELECT
                 date_trunc('day', 	customer_created_at) as day".$sum."
               FROM lead_customer ".$where."
            
                 GROUP BY day) results
            ON (date = results.day)";

        try {
            $leads = DB::select($select);
        } catch (\Illuminate\Database\QueryException $e) {
            return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'There is problem with database query.');
        }
        return $leads;
    }

	public function validateCountInput(Request $request)
	{
		if (empty($request->date_from) || empty($request->date_to)) {
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

    public function validateAnalysisInput(Request $request)
    {
        if (empty($request->date_from) || empty($request->date_to) || empty($request->product)) {
            return false;
        } else {
            return true;
        }
    }
}
