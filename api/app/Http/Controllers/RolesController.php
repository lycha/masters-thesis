<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\ApiUser;
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
			$apiKeyOutput = $this->createApiKeyRole();
			$apiKeyReadOutput = $this->createApiReadKeyRole();
			$admin = new Admin();
			$newAdmin  = $admin->create($name, $email, $password);

			$apiKeyUser = new ApiUser();
			$apiKeyUser->create();
			$apiKeyUser->createRead();
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
			$roleAdmin->assignPermission('api_key'); 
			$roleAdmin->assignPermission('university'); 
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
			$roleUser->assignPermission('user.user');
			$roleUser->assignPermission('lead.user'); 
			$roleUser->assignPermission('campaign.user'); 
			$roleUser->assignPermission('customer.user'); 
			$roleUser->assignPermission('entity.user'); 
			$roleUser->assignPermission('product.user'); 
			$roleUser->assignPermission('university.user'); 

			if ($roleUser->exists) {
				return array('success_user_role' => 'Created User role.');
			} else {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'User role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'User role creation failed.');
		}
	}

	private function createApiKeyRole()
	{
		try {
			$roleUser = new Role();
			$roleUser->name = 'ApiKeyUser';
			$roleUser->slug = 'api';
			$roleUser->description = 'priviliges for api calls';
			$roleUser->save();
			$roleUser->assignPermission('lead.forms');
			$roleUser->assignPermission('customer.forms'); 
			$roleUser->assignPermission('entity.forms'); 
			$roleUser->assignPermission('university.forms'); 

			if ($roleUser->exists) {
				return array('success_api_role' => 'Created Api role.');
			} else {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'Api role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'Api role creation failed.');
		}
	}

	private function createApiReadKeyRole()
	{
		try {
			$roleUser = new Role();
			$roleUser->name = 'ApiKeyReadUser';
			$roleUser->slug = 'apiread';
			$roleUser->description = 'priviliges for api calls with read permissions';
			$roleUser->save();
			$roleUser->assignPermission('lead.apiread');
			$roleUser->assignPermission('customer.apiread'); 
			$roleUser->assignPermission('entity.apiread'); 
			$roleUser->assignPermission('university.apiread'); 

			if ($roleUser->exists) {
				return array('success_api_read_role' => 'Created Api Read role.');
			} else {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'Api role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
				return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'Api role creation failed.');
		}
	}
}