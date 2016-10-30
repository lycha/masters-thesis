<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Customer extends Model
{
	/**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'customers';

    public function getId()
    {
      return $this->id;
    }

    public function setFields($fields)
    {
        $this->fields = $this->json2hstore($fields);
    }

    public static function all($columns = ['*'])
    {
        $columns = is_array($columns) ? $columns : func_get_args();

        $instance = new static;

        //$customers = $instance->newQuery()->get($columns)->toArray();
        $customers = $instance->newQuery()->with('lead')->get();
        $newCustomers = array();
        foreach ($customers as $customer) {
            $fields = $instance->hstore2json($customer['fields']);
            $customer['fields'] = json_decode($fields);
            $newCustomers[] = $customer;
        }
        return $newCustomers;
    }

    public function json2hstore($fields)
    {
        $json = json_encode($fields);
        $fields = str_replace(":", "=>", $json);
        $fields = str_replace("{", "", $fields);
        $fields = str_replace("}", "", $fields);
        return $fields;
    }
    private function hstore2json($hstore)
    {
        $json = str_replace("=>", ":", "{".$hstore."}");
        $json = stripslashes($json);
        return $json;
    }
    public function lead()
    {
        return $this->hasOne('App\Lead', 'id', 'lead_id');
    }
}
