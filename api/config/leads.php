<?php

return  [
 
 	/*
    |--------------------------------------------------------------------------
    | UTM Campaign Gereric Model
    |--------------------------------------------------------------------------
    |
    | This data will be inserted into lead record when no active 
    | campaign is associated in request.
    |
    */
    'campaign_generic' => [
    	'name' => 'generic',
		'description' => 'generic',
		'slug' => 'generic',
		'expires_on' => '9999-12-30 00:00:00'
    ],

	/*
    |--------------------------------------------------------------------------
    | Entity Gereric Model
    |--------------------------------------------------------------------------
    |
    | This data will be inserted into lead record when entity slug from URL 
    | is not found in database
    |
    */
    'entity_generic' => [
    	'name' => 'generic',
        'expa_id' => '1510',
        'expa_name' => 'KRAKOW',
		'slug' => 'generic'
    ],

	/*
    |--------------------------------------------------------------------------
    | Product Gereric Model
    |--------------------------------------------------------------------------
    |
    | This data will be inserted into lead record when product slug from URL 
    | is not found in database
    |
    */
    'product_generic' => [
    	'name' => 'generic',
        'slug' => 'generic',
        'description' => 'generic'
    ]


];