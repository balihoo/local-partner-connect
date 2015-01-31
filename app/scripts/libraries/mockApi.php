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

    case 'GET':
        if ($_GET['type'] == 'getCampaigns') {
            getCampaigns();
        }
        else if ($_GET['type'] == 'getTacticsForCampaign') {
            $param = $_GET['param'];
            getTacticsForCampaign($param);
        }
        break;

    case 'POST':
        getClientAPIKey();
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

function getCampaigns() {
    $campaigns = '[
  {
    "id": 34,
    "title": "Test Campaign",
    "start" : "2014-05-02",
    "end": "2014-06-05",
    "status": "active"
  },
  {
    "id": 23,
    "title": "Another Campaign",
    "start" : "2014-01-02",
    "end": "2014-01-28",
    "status": "active"
  }
]';

    echo $campaigns;
}

function getTacticsForCampaign($campaignId) {

    switch($campaignId) {
        case '34':
            $tactics = '[
      {
        "id": 34,
        "title": "Tactic Name",
        "start" : "2014-05-02",
        "end": "2014-06-05",
        "channel": "Email",
        "description": "A tactic description would go here if it exists"
      },
      {
        "id": 34,
        "title": "Another Tactic Name",
        "start" : "2014-07-13",
        "end": "2014-09-20",
        "channel": "Display",
        "description": "Another tactic description would go here if it exists"
      }
    ]';
            break;

        case '23':
            $tactics = '[
      {
        "id": 23,
        "title": "Yet Another Tactic Name",
        "start" : "2014-01-02",
        "end": "2014-01-12",
        "channel": "Display",
        "description": "Yet another tactic description would go here if it exists"
      }
    ]';
            break;
    }

    echo $tactics;
}
