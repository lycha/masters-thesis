<?php 

namespace App;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use App\Http\Utils\ErrorManager;
/**
* 
*/
class Admin
{
	
	public function __construct()
	{
	}

	public function create($name, $email, $password)
	{
		$users = User::all();
		foreach ($users as $user) {
			if ($user->is('admin')) {
            	return false;
			} 
		}
		$user = User::create([
           'name' => $name,
           'email' => $email,
           'password' => bcrypt($password),
       	]);
		$user->assignRole('admin');
		return $user->toArray();
	}
}