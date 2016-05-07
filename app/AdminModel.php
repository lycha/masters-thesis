<?php 

namespace App;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
/**
* 
*/
class AdminModel
{
	
	public function __construct()
	{
	}

	public function create($name, $email, $password)
	{
		$users = User::all();
		foreach ($users as $user) {
			if ($user->is('admin')) {
				return array('error' => 'Admin is already created');
			} 
		}
		$user = User::create([
           'name' => $name,
           'email' => $email,
           'password' => bcrypt($password),
       	]);
		$user->assignRole('admin');
		return array('success_new_admin' => 'Created new Admin with id: '.$user->getId());
	}
}