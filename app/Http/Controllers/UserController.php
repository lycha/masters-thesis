<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use Validator;
/**
* 
*/
class UserController extends Controller
{
	//Error codes
	private $INVALID_PAYLOAD = 'INVALID_PAYLOAD';
	private $REQUEST_FAILED = 'REQUEST_FAILED';
	private $USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST';
	private $ADMIN_USER_ID = 'ADMIN_USER_ID';
	
	public function __construct()
	{
	}

	public function create()
	{
		$name = Input::get('name');
		$email = urldecode(Input::get('email'));
		$password = urldecode(Input::get('password'));

		//check if email is unique
		$input['email'] = $email;
		$uniqueEmailRule = array('email' => 'unique:users,email');
		$validator = Validator::make($input, $uniqueEmailRule);

		if ($validator->fails()) {
			return ErrorManager::error400(ErrorManager::$EMAIL_NOT_UNIQUE, 'Email already exists in database.');
		}
		if (empty($name) || empty($email) || empty($password) ) {
			return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} else {
			try {
				$user = User::create([
		           'name' => $name,
		           'email' => $email,
		           'password' => bcrypt($password),
		       	]);

				$user->assignRole('user');

				return response()->json($user, 200);
			} catch(\Illuminate\Database\QueryException $e) {
			return ErrorManager::error400(ErrorManager::$OBJECT_CREATION_FAILED, 'User creation failed.');
			}
		}
	}

	public function delete($id)
	{
		if ($id == 1) {
			return ErrorManager::error400(ErrorManager::$INTERNAL_VIOLATION, 'Can not delete admin.');
		}

		$user = User::find($id);
		if ($user == null) {
			return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'User does not exist.');
		}
		$user->delete();
	}

	public function view()
	{
		return response()->json(User::role('user')->get());
	}

	public function update($user)
	{
		//todo
	}
}