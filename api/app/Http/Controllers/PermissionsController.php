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
		$apiKeyForAdminPerm = $this->createApiKeyForAdminPermissions();
		$universitiesForAdminPerm = $this->createUniversitiesForAdminPermissions();

		$userForUserPerm = $this->createUserForUserPermissions();
		$leadForUserPerm = $this->createLeadForUserPermissions();
		$campaignForUserPerm = $this->createCampaignForUserPermissions();
		$customerForUserPerm = $this->createCustomerForUserPermissions();
		$entityForUserPerm = $this->createEntityForUserPermissions();
		$productForUserPerm = $this->createProductForUserPermissions();

		$leadForFormsPerm = $this->createLeadForFormsPermissions();
		$customerForFormsPerm = $this->createCustomerForFormsPermissions();
		$entityForFormsPerm = $this->createEntityForFormsPermissions();
		$universitiesForFormsPerm = $this->createUniversitiesForFormsPermissions();

		if ($userForAdminPerm && 
			$leadForAdminPerm &&
			$campaignForAdminPerm &&
			$customerForAdminPerm &&
			$entityForAdminPerm &&
			$productForAdminPerm &&
			$apiKeyForAdminPerm &&
			$userForUserPerm &&
			$leadForUserPerm &&
			$campaignForUserPerm &&
			$customerForUserPerm &&
			$entityForUserPerm &&
			$productForUserPerm &&
			$leadForFormsPerm &&
			$customerForFormsPerm &&
			$universitiesForAdminPerm &&
			$entityForFormsPerm &&
			$universitiesForFormsPerm) {
			return response()->json([], 201);
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

	public function createApiKeyForAdminPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'api_key',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage api keys permissions for admin role'
		]);
	}

	public function createUniversitiesForAdminPermissions() 
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'university',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => true
		    ],
		    'description' => 'Manage Universities permissions for admin role'
		]);
	}

	/*----------------USER PERMISSIONS --------------*/

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

	public function createLeadForUserPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'lead.user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'lead')->first()->getKey(),
		    'description' => 'Manage lead permissions for user role'
		]);
	}

	public function createCampaignForUserPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'campaign.user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => false,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'campaign')->first()->getKey(),
		    'description' => 'Manage campaign permissions for user role'
		]);
	}

	public function createCustomerForUserPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'customer.user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => true,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'customer')->first()->getKey(),
		    'description' => 'Manage customer permissions for user role'
		]);
	}

	public function createEntityForUserPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'entity.user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => false,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'entity')->first()->getKey(),
		    'description' => 'Manage entity permissions for user role'
		]);
	}

	public function createProductForUserPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'product.user',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => false,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'product')->first()->getKey(),
		    'description' => 'Manage product permissions for user role'
		]);
		var_dump($permission);
	}

	/*----------------Forms API --------------*/
	public function createLeadForFormsPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'lead.forms',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'lead')->first()->getKey(),
		    'description' => 'Manage lead permissions for website forms'
		]);
	}

	public function createCustomerForFormsPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'customer.forms',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => true,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'customer')->first()->getKey(),
		    'description' => 'Manage customer permissions for website forms'
		]);
	}

	public function createUniversitiesForFormsPermissions() 
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'university.forms',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => false,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'university')->first()->getKey(),
		    'description' => 'Manage Universities permissions for website forms'
		]);
	}

	public function createEntityForFormsPermissions()
	{
		$permission = new Permission();
		return $perm = $permission->create([ 
		    'name'        => 'entity.forms',
		    'slug'        => [          // pass an array of permissions.
		        'create'     => false,
		        'view'       => true,
		        'update'     => false,
		        'delete'     => false
		    ],
            'inherit_id' => Permission::where('name', 'entity')->first()->getKey(),
		    'description' => 'Manage entity permissions for user role'
		]);
	}
}