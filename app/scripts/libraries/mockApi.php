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

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'POST':
        getClientAPIKey();
        break;

    case 'GET':
        if ($_GET['type'] == 'getCampaigns') {
            $clientId = $_GET['clientId'];
            $clientApiKey = $_GET['clientApiKey'];
            getCampaigns($clientId, $clientApiKey);
        }
        else if ($_GET['type'] == 'getTacticsForCampaign') {
            $campaignId = $_GET['campaignId'];
            $clientId = $_GET['clientId'];
            $clientApiKey = $_GET['clientApiKey'];
            getTacticsForCampaign($campaignId, $clientId, $clientApiKey);
        }
        break;
}

function getClientAPIKey() {

    $url = 'http://bac.dev.balihoo-cloud.com/localdata/v1.0/genClientAPIKey';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,
        "apiKey={$_POST['apiKey']}&brandKey={$_POST['brandKey']}&locationId={$_POST['locationId']}&userId={$_POST['userId']}&groupId={$_POST['groupId']}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);
    echo $server_output;

    curl_close($ch);
}

function getCampaigns($clientId, $clientApiKey) {
    $url = 'http://bac.dev.balihoo-cloud.com/localdata/v1.0/campaigns?callback=campaignData';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-ClientId: ' . $clientId,'X-ClientApiKey: ' . $clientApiKey));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);
    echo $server_output;

    curl_close($ch);
}

function getTacticsForCampaign($campaignId, $clientId, $clientApiKey) {

    $url = 'http://bac.dev.balihoo-cloud.com/localdata/v1.0/campaign/' . $campaignId . '/tactics?callback=tacticData';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-ClientId: ' . $clientId,'X-ClientApiKey: ' . $clientApiKey));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);
    echo $server_output;

    curl_close($ch);
}
