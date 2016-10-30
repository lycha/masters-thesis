<?php namespace App\Http\Controllers;

use DB;
use Input;
use Helpers;
use Redirect;
use App\Http\Controllers\Statistics;
use Artisan;
use PDO;
use App\Campaign;
use App\Entity;
use App\Product;
use \Config;
use App\Http\Utils\ErrorManager;



class InstallController extends Controller {

	public $envFilePath = "../.env";
	
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
	}

	public function index()
	{
		if(file_exists($this->envFilePath)){
        	return ErrorManager::error410(ErrorManager::$RESOURCE_NOT_AVAILABLE, 'Application is already installed.');
		} else {
			$db_host = urldecode(Input::get('db-host'));
			$db_database = urldecode(Input::get('db-database'));
			$db_username = urldecode(Input::get('db-username'));
			$db_password = urldecode(Input::get('db-password'));
			if (empty($db_host) || empty($db_database) || empty($db_username) || empty($db_password)) {
        		return ErrorManager::error400(ErrorManager::$INVALID_PAYLOAD, 'Some fields are not specified.');
			} else {
				$envResult = $this->generateEnv($db_host, $db_database, $db_username, $db_password);
				if (!$envResult) {
					return ErrorManager::error500(ErrorManager::$WRITE_FILE_ERROR, 'Write error for .env file.');
				}

				$databaseResult = $this->testDb($db_host, $db_database, $db_username, $db_password);
				if (!$databaseResult) {
					return ErrorManager::error500(ErrorManager::$DATABASE_ERROR, 'Database connection error.');
				}
				
				return response()->json(array_merge_recursive($envResult, $databaseResult));
			}
		}
	}

	public function generateEnv($db_host, $db_database, $db_username, $db_password)
	{
		$myfile = fopen($this->envFilePath, "w");
		$txt = "APP_ENV=local
				APP_DEBUG=true
				APP_KEY=".md5(microtime().rand())."
							
				DB_CONNECTION=pgsql
				DB_HOST=".$db_host."
				DB_DATABASE=".$db_database."
				DB_USERNAME=".$db_username."
				DB_PASSWORD=".$db_password."

				CACHE_DRIVER=file
				SESSION_DRIVER=file
				QUEUE_DRIVER=sync

				REDIS_HOST=localhost
				REDIS_PASSWORD=null
				REDIS_PORT=6379

				MAIL_DRIVER=smtp
				MAIL_HOST=mailtrap.io
				MAIL_PORT=2525
				MAIL_USERNAME=null
				MAIL_PASSWORD=null
				MAIL_ENCRYPTION=null";
		
		if (fwrite($myfile, $txt) === FALSE) {
			fclose($myfile);
			return false;
		} else {
			fclose($myfile);
			return array('env_success' => '.env file generated');
		}
	}

	public function testDb($db_host, $db_database, $db_username, $db_password)
	{
		try {
			$output = new PDO('pgsql:dbname='.$db_database.
				';host='.$db_host, $db_username, $db_password);
			return array('database_success' => 'Database connection success ');
		} catch (\PDOException $e) {
			$this->deleteEnv();
			return false;
		}
	}

	public function deleteEnv()
	{
		unlink($this->envFilePath);
	}

	public function runMigrations()
	{
		try {
			//echo '<br>init migrate:install...';
			Artisan::call('migrate:install');
			//echo 'done migrate:install';

			//echo '<br>init with app tables migrations...';
			/*Artisan::call('migrate', [
			'--path'     => "app/database/migrations"
			]);*/
			\Artisan::call('migrate'); 
			//echo '<br>done with app tables migrations';
			Artisan::call('migrate:refresh');

			$this->seedGenericModels();

			return array('migration_success' => 'Migrations passed.');

	    } catch (\PDOException $e) {		
	    	return ErrorManager::error500(ErrorManager::$MIGRATIONS_ERROR, 'Migrations error.'.$e);
		} catch (Exception $e) {		
			return ErrorManager::error500(ErrorManager::$MIGRATIONS_ERROR, 'Migrations error.'.$e);
	    }
	}

	private function seedGenericModels()
	{
		$campaign = new Campaign;
        $campaign->name = Config::get('leads.campaign_generic.name');	
        $campaign->description = Config::get('leads.campaign_generic.description');
        $campaign->slug = Config::get('leads.campaign_generic.slug');
        $campaign->expires_on = Config::get('leads.campaign_generic.expires_on');	
        $campaign->save();

		$entity = new Entity;
        $entity->name = Config::get('leads.entity_generic.name');
        $entity->expa_id = Config::get('leads.entity_generic.expa_id');
        $entity->expa_name = Config::get('leads.entity_generic.expa_name');
        $entity->slug = Config::get('leads.entity_generic.slug');
        $entity->save();

		$product = new Product;
        $product->name = Config::get('leads.product_generic.name');
        $product->slug = Config::get('leads.product_generic.slug');
        $product->description = Config::get('leads.product_generic.description');
        $product->save();
	}
}
