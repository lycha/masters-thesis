<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\AdminModel;
use Kodeine\Acl\Models\Eloquent\Permission;
/**
* 
*/
class PermissionsController extends Controller
{

	public function create()
	{
		
		$userForAdminPerm = $this->createUserForAdminPermissions();
		$userForUserPerm = $this->createUserForUserPermissions();
		//$assingedAdmin = $this->assignAdminPermissions($userForAdminPerm);
		if ($userForAdminPerm && $userForUserPerm) {
			return response()->json([], 200);
		}
	}

	private function createUserForAdminPermissions() {
		$permission = new Permission();
		return $permUser = $permission->create([ 
		    'name'        => 'user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage user permissions for admin role'
		]);
	}

	private function createUserForUserPermissions() {
		$permission = new Permission();
		return $permUser = $permission->create([ 
		    'name'        => 'user.user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => false,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'user')->first()->getKey(),
		    'description' => 'Manage user permissions for user role'
		]);
	}

	private function assignAdminPermissions($userPerm) {
		$adminRole = Role::where('slug', 'admin')->first();
		$adminRole->assignPermission($userPerm);
		return true;
	}
}