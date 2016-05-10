<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\Admin;
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
			return response()->json(['error' => 'Some fields are not specified.']);
		} else {
			$adminOutput = $this->createAdminRole();
			$userOutput = $this->createUserRole();
			$admin = new Admin();
			$newAdmin  = $admin->create($name, $email, $password);

			return response()->json(array_merge($adminOutput, $userOutput, $newAdmin));
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
				return array('error' => 'Admin role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
			return array('error' => 'Admin role creation failed: '.$e);
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

			if ($roleUser->exists) {
				return array('success_user_role' => 'Created User role.');
			} else {
				return array('error' => 'User role creation failed.');
			}
		} catch(\Illuminate\Database\QueryException $e) {
			return array('error' => 'Admin role creation failed: '.$e);
		}
	}
}