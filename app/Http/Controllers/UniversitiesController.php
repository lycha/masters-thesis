<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\University;

use App\Http\Utils\ErrorManager;
//todo implement all CRUD for Expa Leads
class UniversitiesController extends Controller
{
    public function create(Request $request)
	{
        $university = new University;
        $university->name = $request->name;	
        $university->slug = $request->slug;	
        $university->entity_slug = $request->entity_slug;	

		if (!$this->validateInput($university)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		}

        if (University::where('slug', $request->slug)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided University slug is not unique.');
        }

        try {
        	$university->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Query exception while saving to database.');
        }
        $entity = $university->entity;

        return University::with('entity')->find($university->id);;
	}

	public function delete($id)
	{
		$university = University::find($id);
		if ($university == null) {
        	return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'University does not exist.');
		}
		$university->delete();
	}

	public function view()
	{
		return response(University::with('entity')->get());
	}

	public function viewById($id)
	{

		return University::with('entity')->find($id);
	}

	public function update(Request $request)
	{
		$university = University::find($request->id);
        $university->name = $request->name;	
        $university->slug = $request->slug;	
        $university->entity_slug = $request->entity_slug;	

		if (!$this->validateInput($university) && empty($request->id)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

		$otherUniversity = "";
		try {
			$otherUniversity = University::where('slug', $request->slug)->first();
		} catch (\Exception $e) {

		}

		if ($otherUniversity != null) {
			
	        if ($otherUniversity->id != $request->id && $otherUniversity->slug == $request->slug) {
	        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided University slug is not unique.');
	        }
	    }

        try {
        	$university->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Query exception while saving to database.');
        }

        return University::with('entity')->find($university->id);
	}

	private function validateInput(University $university)
	{
		if (empty($university->name) || empty($university->slug) || empty($university->entity_slug)) {
			return false;
		} else {
			return true;
		}
	}
}
