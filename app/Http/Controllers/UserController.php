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
	private $EMAIL_NOT_UNIQUE = 'EMAIL_NOT_UNIQUE';
	private $INVALID_PAYLOAD = 'INVALID_PAYLOAD';
	private $REQUEST_FAILED = 'REQUEST_FAILED';
	
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
			return response()->json(['error' => ['code' => $this->EMAIL_NOT_UNIQUE, 
				'title' => 'Email already exists in database.']], 400);
		}
		if (empty($name) || empty($email) || empty($password) ) {
			return response()->json(['error' => ['code' => $this->INVALID_PAYLOAD, 
				'title' => 'Some elements are not provided.']], 400);
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
				return response()->json(['error' => ['code' => $this->REQUEST_FAILED, 
					'title' => 'User creation failed.',
					'source' => $e]], 400);
			}
		}
	}
}