/*$expiration = strtotime('+10 years', time());
        $permissions = [Permission::where('name', 'user')->first(), Permission::where('name', 'user')->first()];
        $payload = JWTFactory::sub(uniqid())->setTTL($expiration)->permissions($permissions)->make();
        $token = JWTAuth::encode($payload);
        return $token; //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NzJmMmNlMzhiYTFlIiwicGVybWlzc2lvbnMiOlt7ImlkIjo4LCJpbmhlcml0X2lkIjpudWxsLCJuYW1lIjoidXNlciIsInNsdWciOnsiY3JlYXRlIjp0cnVlLCJ2aWV3Ijp0cnVlLCJ1cGRhdGUiOnRydWUsImRlbGV0ZSI6dHJ1ZX0sImRlc2NyaXB0aW9uIjoiTWFuYWdlIHVzZXIgcGVybWlzc2lvbnMiLCJjcmVhdGVkX2F0IjoiMjAxNi0wNS0wNyAyMDoyOTo1NiIsInVwZGF0ZWRfYXQiOiIyMDE2LTA1LTA3IDIwOjI5OjU2In0seyJpZCI6OCwiaW5oZXJpdF9pZCI6bnVsbCwibmFtZSI6InVzZXIiLCJzbHVnIjp7ImNyZWF0ZSI6dHJ1ZSwidmlldyI6dHJ1ZSwidXBkYXRlIjp0cnVlLCJkZWxldGUiOnRydWV9LCJkZXNjcmlwdGlvbiI6Ik1hbmFnZSB1c2VyIHBlcm1pc3Npb25zIiwiY3JlYXRlZF9hdCI6IjIwMTYtMDUtMDcgMjA6Mjk6NTYiLCJ1cGRhdGVkX2F0IjoiMjAxNi0wNS0wNyAyMDoyOTo1NiJ9XSwiaXNzIjoiaHR0cDpcL1wvbWFzdGVyLXRvb2wuZGV2XC9hcGlcL3YxXC91c2VyXC9jcmVhdGUiLCJpYXQiOjE0NjI3MDk0NzUsImV4cCI6MTA4MTU3MjQ1OTc1LCJuYmYiOjE0NjI3MDk0NzUsImp0aSI6IjIwMjUxYjQ1YzVmMWZkNzViMjJkOTFhZDc3NGVmNTQ3In0.EkAh2wB8Nv9Kd2tcaal1pgB9Cm_6y3keCoP0WOlflbo*/

<?php namespace App\Http\Controllers;
use Kodeine\Acl\Models\Eloquent\Role;
use Input;
use App\User;
use Validator;
/**
* 
*/
class UserApiController extends Controller
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