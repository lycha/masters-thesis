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
		
		$userPerm = $this->createUserPermissions();
		$assingedAdmin = $this->assignAdminPermissions($userPerm);
		if ($assingedAdmin) {
			return response()->json([], 200);
		}
	}

	private function createUserPermissions() {
		$permission = new Permission();
		return $permUser = $permission->create([ 
		    'name'        => 'user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage user permissions'
		]);
	}

	private function assignAdminPermissions($userPerm) {
		$adminRole = Role::where('slug', 'admin')->first();
		$adminRole->assignPermission($userPerm);
		return true;
	}
}