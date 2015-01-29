<?php
/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

//CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');

switch ($_GET['type']) {
    case 'getCampaigns':
        getCampaigns();
        break;

    case 'getTacticsForCampaign':
        $param = $_GET['param'];
        getTacticsForCampaign($param);
        break;
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
