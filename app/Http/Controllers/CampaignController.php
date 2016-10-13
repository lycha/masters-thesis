<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Campaign;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Utils\ErrorManager;

class CampaignController extends Controller
{
	public function create(Request $request)
	{
        $campaign = new Campaign;
        $campaign->name = $request->name;	
        $campaign->description = $request->description;	
        $campaign->slug = $request->slug;	
        $campaign->expires_on = $request->expires_on;	

		if (!$this->validateCampaignInput($campaign)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        if (date_parse($request->expires_on)['error_count'] != 0) {
        	return ErrorManager::error400(ErrorManager::$DATE_NOT_VALID, 'Date format is not valid.');
        }

        if (Campaign::whereSlug($request->slug)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided campaign slug is not unique.');
        }

        try {
        	$campaign->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Invalid payload. Please check date format and unique fields.');
        }

        return response($campaign);
	}

	public function delete($id)
	{
		$campaign = Campaign::find($id);
		if ($campaign == null) {
        	return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'CAMPAIGN does not exist.');
		}
		$campaign->delete();
	}

	public function view()
	{
		return response(Campaign::all());
	}

	public function viewById($id)
	{
		return Campaign::find($id);
	}

	public function update(Request $request)
	{
		$campaign = Campaign::find($request->id);
		$campaign->name = $request->name;	
        $campaign->description = $request->description;	
        $campaign->slug = $request->slug;	
        $campaign->expires_on = $request->expires_on;	

		if (!$this->validateCampaignInput($campaign) && empty($request->id)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 
		
        if (date_parse($request->expires_on)['error_count'] != 0) {
        	return ErrorManager::error400(ErrorManager::$DATE_NOT_VALID, 'Date format is not valid.');
        }

        if (Campaign::whereSlug($request->slug)->first()->id != $request->id) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided campaign slug is not unique.');
        }

        try {
        	$campaign->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Invalid payload. Please check date format and unique fields.');
        }

        return response($campaign);
	}

	private function validateCampaignInput(Campaign $campaign)
	{
		if (empty($campaign->name) || empty($campaign->description) || empty($campaign->slug) || empty($campaign->expires_on)) {
			return false;
		} else {
			return true;
		}
	}
}
