<?php
/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

//$allData = '[
//  {
//    "id": 34,
//    "title": "Test Campaign",
//    "start" : "2014-01-02",
//    "end": "2014-06-05",
//    "status": "active",
//    "tactics":  [
//      {
//        "id": 12,
//        "title": "Tactic Name",
//        "start" : "2014-05-02",
//        "end": "2014-06-05",
//        "channel": "Email",
//        "description": "A tactic description would go here if it exists"
//      },
//      {
//        "id": 24,
//        "title": "Another Tactic Name",
//        "start" : "2014-01-02",
//        "end": "2014-01-12",
//        "channel": "Display",
//        "description": "Another tactic description would go here if it exists"
//      }
//    ]
//  },
//  {
//    "id": 23,
//    "title": "Another Campaign",
//    "start" : "2014-01-02",
//    "end": "2014-01-28",
//    "status": "active",
//    "tactics": []
//  }
//]';
//
//echo $allData;

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
    $tactics = '[
      {
        "id": 12,
        "title": "Tactic Name",
        "start" : "2014-05-02",
        "end": "2014-06-05",
        "channel": "Email",
        "description": "A tactic description would go here if it exists"
      },
      {
        "id": 24,
        "title": "Another Tactic Name",
        "start" : "2014-01-02",
        "end": "2014-01-12",
        "channel": "Display",
        "description": "Another tactic description would go here if it exists"
      }
    ]';

    echo $tactics;
}
