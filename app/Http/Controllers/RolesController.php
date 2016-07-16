<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\Admin;
use App\Http\Utils\ErrorManager;
/**
* 
*/
class RolesController extends Controller
{

	public function create()
	{
		
		$name = urldecode(Input::get('name'));
		$email = urldecode(Input::get('email'));
		$password = urldecode(Input::get('password'));

		if (empty($name) || empty($email) || empty($password) ) {
            return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some fields are not specified.');
		} else {
			$adminOutput = $this->createAdminRole();
			$userOutput = $this->createUserRole();
			$admin = new Admin();
			$newAdmin  = $admin->create($name, $email, $password);
			if (!$newAdmin) {
				return ErrorManager::error400(ErrorManager::$OBJECT_DUPLICATED, 'Admin is already created.');
			}

			return response()->json(array_merge_recursive($adminOutput, $userOutput, ['admin' => $newAdmin]), 201);
		}
	}

	private function createAdminRole()
	{
		try {
			$roleAdmin = new Role();
			$roleAdmin->name = 'Admin';
			$roleAdmin->slug = 'admin';
			$roleAdmin->description = 'manage administration privileges';
			$roleAdmin->save();
			$roleAdmin->assignPermission('user'); //todo add all future permissions
			$roleAdmin->assignPermission('lead'); 
			$roleAdmin->assignPermission('campaign'); 
			$roleAdmin->assignPermission('customer'); 
			$roleAdmin->assignPermission('entity'); 
			$roleAdmin->assignPermission('product'); 
			if ($roleAdmin->exists) {
				return array('success_admin_role' => 'Created Admin role.');
			} else {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'Admin role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'Admin role creation failed.');
		}
	}

	private function createUserRole()
	{
		try {
			$roleUser = new Role();
			$roleUser->name = 'User';
			$roleUser->slug = 'user';
			$roleUser->description = 'standard user privileges';
			$roleUser->save();
			$roleUser->assignPermission('user.user'); //todo add all future permissions
			$roleUser->assignPermission('products.user'); //todo add all future permissions

			if ($roleUser->exists) {
				return array('success_user_role' => 'Created User role.');
			} else {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'User role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'User role creation failed.');
		}
	}
}