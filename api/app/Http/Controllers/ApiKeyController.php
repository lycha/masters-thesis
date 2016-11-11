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
        $currentTime = strtotime("now");
        $expirationTime = strtotime($request->expiration_date);
        $ttl = round(abs($expirationTime - $currentTime) / 60,0);
        $customClaims = ['sub', uniqid()];
		$user = null;
		if ($request->read_permissions) {
			$user = User::where('name', 'apiread')->first();
		} else {
			$user = User::where('name', 'api')->first();
		}
		JWTFactory::setTTL($ttl);
		$token = JWTAuth::fromUser($user, $customClaims);

		$apiKey = new ApiKey;
        $apiKey->name = $request->name;	
        $apiKey->description = $request->description;	
        $apiKey->expiration_date = $request->expiration_date;
        $apiKey->key = $token;

		if (empty($apiKey->name) || empty($apiKey->description) || empty($apiKey->expiration_date) ) {
			return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some elements are not provided.');
		} else {
	        try {
	        	$apiKey->save();
	        } catch (\Illuminate\Database\QueryException $e) {
	        	return($e);
	        	return ErrorManager::error400(ErrorManager::$DATABASE_ERROR, 'Query exception while saving to database.');
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
		try {
			JWTAuth::setToken($apiKey->key)->invalidate();
		} catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e){}
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