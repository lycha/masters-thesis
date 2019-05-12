/*
Plugin Name: Marketing Tool Registration Form 
Description: Plugin enables effective management of leads and customers with analysis of marketing efforts.
Version: 0.2
Author: Krzysztof Jackowski
Author URI: https://www.linkedin.com/in/krisjackowski/
License: GPL 
*/


	
	|--------------------------------------------------------------------------
	| config.json
	|--------------------------------------------------------------------------
	|
	| Here are saved api information to connect with Marketing tool.
	|
	
	|--------------------------------------------------------------------------
	| form.html
	|--------------------------------------------------------------------------
	|
	| Form template with basic javascript to manage it. Template is updated 
	| based on information recived by plugin. All the variables are encapsulated with {} brackets
	|

	|--------------------------------------------------------------------------
	| manage_leads.php
	|--------------------------------------------------------------------------
	|
	| Script executed when lead opens website. Saves cookie file with lead information 
	| and updates database via API
	|

	
	|--------------------------------------------------------------------------
	| manage_registration.php
	|--------------------------------------------------------------------------
	|
	| Script executed when submit button is pressed. Checks if lead visited website before based
	| on cookie file. If file doesn't exists gets current lead information and saves in DB via API.
	| If cookie is saved retrieves lead data from file and updates DB record via API.
	| If cookie is saved but next registration is performed, gets new lead information and saves in DB
	| Moreover executes gis_reg_process.php script. 
	|

	
	|--------------------------------------------------------------------------
	| plugin.php
	|--------------------------------------------------------------------------
	|
	| Main script of plugin. Perfomes some config operations and updates form template.
	|
	
	
	|--------------------------------------------------------------------------
	| style.css
	|--------------------------------------------------------------------------
	|
	| Basic styles to display form. 
	|
