<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Entity;

class EntityController extends Controller
{
    public function create(Request $request)
	{
        $entity = new Entity;
        $entity->name = $request->name;	
        $entity->description = $request->description;	
        $entity->slug = $request->slug;	

		if (!$this->validateEntityInput($entity)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		}

        if (Entity::whereSlug($request->slug)->first() != null) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided entity slug is not unique.');
        }

        try {
        	$entity->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Invalid payload.');
        }

        return response($entity);
	}

	public function delete($id)
	{
		$entity = Entity::find($id);
		if ($entity == null) {
        	return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'Entity does not exist.');
		}
		$entity->delete();
	}

	public function view()
	{
		return response(Entity::all());
	}

	public function viewById($id)
	{
		return Entity::find($id);
	}

	public function update(Request $request)
	{
		$entity = Entity::find($request->id);
		$entity->name = $request->name;	
        $entity->description = $request->description;	
        $entity->slug = $request->slug;	

		if (!$this->validateEntityInput($entity) && empty($request->id)) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} 

        if (Entity::whereSlug($request->slug)->first()->id != $request->id) {
        	return ErrorManager::error400(ErrorManager::$SLUG_NOT_UNIQUE, 'Provided entity slug is not unique.');
        }

        try {
        	$entity->save();
        } catch (\Illuminate\Database\QueryException $e) {
        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Invalid payload. Please check date format and unique fields.');
        }

        return response($entity);
	}

	private function validateEntityInput(Entity $entity)
	{
		if (empty($entity->name) || empty($entity->description) || empty($entity->slug)) {
			return false;
		} else {
			return true;
		}
	}
}
