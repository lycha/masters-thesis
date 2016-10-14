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
    public $incrementing = false;
    protected $table = 'leads';
    protected $fillable = ['utm_source',
'utm_campaign_id',
'utm_medium',
'utm_content',
'utm_term',
'entity_id',
'product_id'];

    public function getId()
    {
      return $this->id;
    }
}
