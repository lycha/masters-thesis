<?php

//var_dump($_POST);

$fields = array(
    'first_name' => urlencode(htmlspecialchars($_POST['first_name'])),
    'last_name' => urlencode(htmlspecialchars($_POST['last_name'])),
    'email' => urlencode(htmlspecialchars($_POST['email'])),
    'phone_number' => urlencode(htmlspecialchars($_POST['phone_number'])),
    'utm_source' => urlencode(htmlspecialchars($_POST['utm_source'])),
    'utm_medium' => urlencode(htmlspecialchars($_POST['utm_medium'])),
    'utm_campaign' => urlencode(htmlspecialchars($_POST['utm_campaign'])),
    'utm_content' => urlencode(htmlspecialchars($_POST['utm_content'])),
    'utm_term' => urlencode(htmlspecialchars($_POST['utm_term'])),
    'entity' => urlencode(htmlspecialchars($_POST['entity'])),
    'entity_id' => urlencode(htmlspecialchars($_POST['entity_id'])),
    'product' => urlencode(htmlspecialchars($_POST['product'])),
    'subproduct' => urlencode(htmlspecialchars($_POST['subproduct'])),
    'localcommittee' => urlencode($_POST['localcommittee']),
    'university' => urlencode($_POST['university']),
    'fingerprint' => urlencode($_POST['fingerprint'])
);

$string = file_get_contents("config.json");
$config = json_decode($string, true);

if($fields['fingerprint'] != "" && $fields['fingerprint'] != 'undefined') {
    saveCustomer($fields, $config);
} else{
	$uuid = registerNewLead($fields, $config);
    if ($uuid != null) {
        $fields['fingerprint'] = $uuid;
        saveCustomer($fields, $config);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        header('Content-Type: text; charset=UTF-8');
        die('UNEXPECTED_ERROR');
    }
}

function saveCustomer($fields, $config)
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => $config['api_host']."/customers",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => "
        {
            \"lead_id\": \"".$fields['fingerprint']."\",
            \"email\": \"".$fields['email']."\",
            \"entity_id\": \"".$fields['entity_id']."\",
            \"fields\": {
                \"name\": \"".$fields['first_name']."\",
                \"surname\": \"".$fields['last_name']."\",
                \"localcommittee\": \"".$fields['localcommittee']."\",
                \"university\": \"".$fields['university']."\",
                \"phone_number\": \"".$fields['phone_number']."\"
            }
        }",
      CURLOPT_HTTPHEADER => array(
        "authorization: Bearer  ".$config['api_auth_token'],
        "content-type: application/json"
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    $response = json_decode($response, true);

    if (array_key_exists('error', $response)) {
        header('HTTP/1.1 500 Internal Server Error');
        header('Content-Type: text; charset=UTF-8');
        //die($response['error']['code']);
        die($response);
    } else {
        //Uncomment here to make GIS registration available
        //include 'gis_reg_process.php';
    }
}

function registerNewLead($fields, $config)
{
    $curl = curl_init();
    $uuid = uniqid('generated_');

    curl_setopt_array($curl, array(
      CURLOPT_URL => $config['api_host']."/leads",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => "
        {
            \"id\": \"".$uuid."\", 
            \"utm_source\": \"".$fields['utm_source']."\", 
            \"utm_campaign\": \"".$fields['utm_campaign']."\", 
            \"utm_medium\": \"".$fields['utm_medium']."\", 
            \"utm_content\": \"".$fields['utm_content']."\", 
            \"utm_term\": \"".$fields['utm_term']."\", 
            \"entity\": \"".$fields['entity']."\", 
            \"product\": \"".$fields['product']."\", 
            \"subproduct\": \"".$fields['subproduct']."\"
        }",

      CURLOPT_HTTPHEADER => array(
        "authorization: Bearer  ".$config['api_auth_token'],
        "content-type: application/json"
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    $response = json_decode($response, true);
    if (array_key_exists('error', $response)) {
        return null;
    } else {
        return $uuid;
    }
}
?>