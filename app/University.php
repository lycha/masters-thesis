<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'universities';

    public function entity()
    {
    	return $this->hasOne('App\Entity', 'slug', 'entity_slug');
    }
}
