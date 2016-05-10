<?php namespace App\Http\Controllers;

use DB;
use Input;
use Helpers;
use Redirect;
use App\Http\Controllers\Statistics;
use Artisan;
use PDO;


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

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		if(file_exists($this->envFilePath)){
			return response()->json(['error' => 'Application is already installed.']);
		} else {
			$db_host = urldecode(Input::get('db-host'));
			$db_database = urldecode(Input::get('db-database'));
			$db_username = urldecode(Input::get('db-username'));
			$db_password = urldecode(Input::get('db-password'));
			if (empty($db_host) || empty($db_database) || empty($db_username) || empty($db_password)) {
				return response()->json(['error' => 'Some fields are not specified.']);
			} else {
				$envResult = $this->generateEnv($db_host, $db_database, $db_username, $db_password);
				$databaseResult = $this->testDb($db_host, $db_database, $db_username, $db_password);
				return response()->json(array_merge($envResult, $databaseResult));
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
			return array('error' => 'Write error.');
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
			return array('error' => 'Database connection error: '.$e);
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

			return array('migration_success' => 'Migrations passed.');

	    } catch (\PDOException $e) {
			return array('error' => 'Migrations error: '.$e);
		} catch (Exception $e) {
	    	return array('error' => 'Migrations error: '.$e);
	    }
	}
}
