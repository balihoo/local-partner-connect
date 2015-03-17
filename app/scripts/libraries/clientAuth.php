<?php
/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

error_reporting(~0);
ini_set('display_errors', 1);

//CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');

$url = 'http://bac.balihoo-cloud.com/localdata/v1.0/genClientAPIKey';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,
    "apiKey={$_POST['apiKey']}&brandKey={$_POST['brandKey']}&locationId={$_POST['locationId']}&userId={$_POST['userId']}&groupId={$_POST['groupId']}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);
echo $server_output;

curl_close($ch);
