<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\Admin;
use Kodeine\Acl\Models\Eloquent\Permission;
use App\Http\Utils\ErrorManager;
/**
* 
*/
class PermissionsController extends Controller
{

	public function create()
	{
		
		$userForAdminPerm = $this->createUserForAdminPermissions();
		$leadForAdminPerm = $this->createLeadForAdminPermissions();
		$campaignForAdminPerm = $this->createCampaignForAdminPermissions();
		$customerForAdminPerm = $this->createCustomerForAdminPermissions();
		$entityForAdminPerm = $this->createEntityForAdminPermissions();
		$productForAdminPerm = $this->createProductForAdminPermissions();

		$userForUserPerm = $this->createUserForUserPermissions();

		if ($userForAdminPerm && 
			$leadForAdminPerm &&
			$campaignForAdminPerm &&
			$customerForAdminPerm &&
			$entityForAdminPerm &&
			$productForAdminPerm &&
			$userForUserPerm) {
			return response(201);
		} else {
            return ErrorManager::error400(ErrorManager::$CREATE_PERMISSIONS_FAILED, 'Failed to create permissions.');
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

	public function createLeadForAdminPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'lead',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage lead permissions for admin role'
		]);
	}

	public function createCampaignForAdminPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'campaign',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage campaign permissions for admin role'
		]);
	}

	public function createCustomerForAdminPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'customer',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage customer permissions for admin role'
		]);
	}

	public function createEntityForAdminPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'entity',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage entity permissions for admin role'
		]);
	}

	public function createProductForAdminPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'product',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage product permissions for admin role'
		]);
	}
}