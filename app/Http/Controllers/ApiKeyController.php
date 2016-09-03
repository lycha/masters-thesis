<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Kodeine\Acl\Models\Eloquent\Permission;
use App\ApiKey;
use App\User;
use JWTFactory;
use JWTAuth;
use App\Http\Requests;
use App\Http\Utils\ErrorManager;
use Kodeine\Acl\Models\Eloquent\Role;

/**
* 
*/
class ApiKeyController extends Controller
{
	//Error codes
	private $INVALID_PAYLOAD = 'INVALID_PAYLOAD';
	private $REQUEST_FAILED = 'REQUEST_FAILED';
	private $USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST';
	private $ADMIN_USER_ID = 'ADMIN_USER_ID';
	
	public function __construct()
	{
	}

	public function create(Request $request)
	{
        $expiration = strtotime('+10 years', time());
        $customClaims = ['sub', uniqid(), 'exp', $expiration];
		$user = User::where('name', 'api')->first();
		$token = JWTAuth::fromUser($user, $customClaims);


		$apiKey = new ApiKey;
        $apiKey->name = $request->name;	
        $apiKey->description = $request->description;	
        $apiKey->expiration_date = $request->expiration_date;
        $apiKey->key = bcrypt($token);

		if (empty($apiKey->name) || empty($apiKey->description) || empty($apiKey->expiration_date) ) {
			return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} else {
	        try {
	        	$apiKey->save();
	        } catch (\Illuminate\Database\QueryException $e) {
	        	return($e);
	        	return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Invalid payload.');
	        }
		}

        return response($apiKey);
	}

	public function delete($id)
	{
		$apiKey = ApiKey::find($id);
		if ($apiKey == null) {
        	return ErrorManager::error400(ErrorManager::$OBJECT_DOES_NOT_EXIST, 'API key does not exist.');
		}
		JWTAuth::setToken($apiKey->key)->invalidate();
		$apiKey->delete();
	}

	public function view()
	{
		return response(ApiKey::all());
	}

	public function update($user)
	{
		//todo
	}
}