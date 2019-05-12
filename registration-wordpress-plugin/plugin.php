<?php
/*
Plugin Name: AIESEC MKT Tool registration  
Description: Plugin based on gis_curl_registration script by Dan Laush upgraded to Wordpress plugin
Version: 0.1
Author: Krzysztof Jackowski
Author URI: https://www.linkedin.com/profile/view?id=202008277&trk=nav_responsive_tab_profile_pic
License: GPL 
*/
defined( 'ABSPATH' ) or die( 'Plugin file cannot be accessed directly.' );

// [expa-form product="gt"]

function expa_form( $atts ) {
    wp_enqueue_script('jquery');
    wp_enqueue_script( 'custom-script', 'https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.4.1/fingerprint2.min.js' );
    $a = shortcode_atts( array(
        'product' => '',
    ), $atts );
    
    echo wp_enqueue_style( 'style-name', plugins_url('style.css', __FILE__ ));
        
    if(isset($_GET['utm_source'])){
        $utm_source = $_GET["utm_source"];
    }else{
        $utm_source = "generic";
    }
    if(isset($_GET['utm_medium'])){
        $utm_medium = $_GET["utm_medium"];
    }else{
        $utm_medium = "generic";
    }
    if(isset($_GET['utm_content'])){
        $utm_content = $_GET["utm_content"];
    }else{
        $utm_content = "";
    }
    if(isset($_GET['utm_term'])){
        $utm_term = $_GET["utm_term"];
    }else{
        $utm_term = "";
    }
    if(isset($_GET['utm_campaign'])){
        $utm_campaign = $_GET["utm_campaign"];
    }else{
        $utm_campaign = "generic";
    }
    if(isset($_GET['subproduct'])){
        $subproduct = $_GET["subproduct"];
    }else{
        $subproduct = "n/d";
    }
    if(isset($_GET['entity'])){
        $entity = $_GET["entity"];
    }else{
        $entity = "n/d";
    }

    $form = file_get_contents('form.html',TRUE);
    $uniqid = uniqid();

    if($subproduct==""){
        $subproduct = "n/d";   
    }
    //check if lead parameters where provided if not set to generic
    if($utm_source==""){
        $utm_source = "generic";   
    }
    if($utm_medium==""){
        $utm_medium = "generic";   
    }
    if($utm_campaign==""){
        $utm_campaign = "generic";   
    }

    $string = file_get_contents(plugins_url('config.json', __FILE__ ));
    $config = json_decode($string, true);
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => $config['api_host']."/universities",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_POSTFIELDS => "",
      CURLOPT_HTTPHEADER => array(
        "authorization: Bearer  ".$config['api_auth_token'],
        "content-type: application/json"
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
      echo "cURL Error #:" . $err;
    } else {
        $leads = json_decode($response); 
        $option_list = $option_list.
            '<option value="">--Wybierz uczelnię--</option>'."\n";
        foreach($leads as $lead){
            $option_list = $option_list.
            '<option value="'.$lead->entity->expa_name.'" data-entityid="'.$lead->entity->id.'">'.$lead->name.'</option>'."\n";
        }
    }

    //////////////////////////////////////////////////////////////////////

    ////////////Replace elements in form.html////////////////////////////
    $form = str_replace("{utm_source}",$utm_source,$form);
    $form = str_replace("{utm_medium}",$utm_medium,$form);
    $form = str_replace("{utm_campaign}",$utm_campaign,$form);
    $form = str_replace("{utm_content}",$utm_content,$form);
    $form = str_replace("{utm_term}",$utm_term,$form);
    $form = str_replace("{subproduct}",$subproduct,$form);
    $form = str_replace("{uniqid}",$uniqid,$form); 
    $form = str_replace("{product}",$a['product'],$form);
    $form = str_replace("{api_url}",$config['api_host'],$form);
    $form = str_replace("{token}",$config['api_auth_token'],$form);
    $form = str_replace("{path-gis_reg_process}",plugins_url('gis_reg_process.php', __FILE__ ),$form);
    $form = str_replace("{path-gis_lcMapper}",plugins_url('gis_lcMapper.js', __FILE__ ),$form);
    $form = str_replace("{path-leads-json}",plugins_url('leads.json', __FILE__ ),$form);
    $actual_link = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $form = str_replace("{website_url}",$actual_link,$form);
    $form = str_replace("{leads-option-list}",$option_list,$form);
    $form = str_replace("{entity}",$entity,$form);
    $form = str_replace("{path-manage_registration}",plugins_url('manage_registration.php', __FILE__ ),$form);
    $form = str_replace("{path-manage_leads}",plugins_url('manage_leads.php', __FILE__ ),$form);
    
    
    if(isset($_GET["thank_you"]) && $_GET["thank_you"]==="true"){
        return "<p>Dziękujemy bardzo za rejestrację. Wkrótce dostaniesz maila z potwierdzeniem założenia konta. Powodzenia w Twojej podróży do kariery!</p>"; 
    } elseif (isset($_GET["error"]) && $_GET["error"]!=""){
        
        $form = str_replace('<div id="error" class="error"><p></p></div>','<div id="error" class="error"><p>'.$_GET["error"].'</p></div>',$form);
        return $form;    
    }
    //var_dump( plugins_url('gis_reg_process.php', __FILE__ ));
    return $form;
}
add_shortcode( 'expa-form', 'expa_form' );

?>
