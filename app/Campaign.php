<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'campaigns';

    public function isActive()
    {
    	if (date('Y-m-d H:i:s') < date('Y-m-d H:i:s', strtotime($this->expires_on))) {
    		return true;
		} else {
			return false;
		}
    }
}
