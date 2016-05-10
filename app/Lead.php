<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
	/**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'leads';

    public function getId()
    {
      return $this->id;
    }
}
