<?php 

namespace App;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\Http\Utils\ErrorManager;
/**
* 
*/
class ApiUser
{
	
	public function __construct()
	{
	}

	public function create()
	{
		$users = User::all();
		foreach ($users as $user) {
			if ($user->is('api')) {
            	return false;
			} 
		}
		$user = User::create([
           'name' => 'api',
           'email' => 'api@api.api',
           'password' => bcrypt(md5(microtime().rand())),
       	]);
		$user->assignRole('api');
		return $user->toArray();
	}

	public function createRead()
	{
		$users = User::all();
		foreach ($users as $user) {
			if ($user->is('apiread')) {
            	return false;
			} 
		}
		$user = User::create([
           'name' => 'apiread',
           'email' => 'apiread@api.api',
           'password' => bcrypt(md5(microtime().rand())),
       	]);
		$user->assignRole('apiread');
		return $user->toArray();
	}
}