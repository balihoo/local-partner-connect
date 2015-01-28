/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

'use strict';


var mockApi = {
    getCampaigns: function () {
        return $.getJSON('scripts/libraries/mockApi.php', {type: 'getCampaigns'}).then(function (data) {

            var campaignArray = [];
            var campaigns = Object.keys(data);

            campaigns.forEach(function (value) {
                var campaign = data[value];
                campaignArray.push(campaign);
            });

            return campaignArray;

        });
    },

    getTacticsForCampign: function (campaignId) {
        return $.getJSON('scripts/libraries/mockApi.php', {
            type: 'getTacticsForCampaign',
            param: campaignId
        }).then(function (data) {

            var tacticArray = [];
            var tactics = Object.keys(data);

            tactics.forEach(function (value) {
                var tactic = data[value];
                tacticArray.push(tactic);
            });

            return tacticArray;

        });
    }
};

function getCampaigns() {
    mockApi.getCampaigns().done(function (data) {

        //data.forEach(function (value) {
        //    $('.campaigns').append('<br>');
        //    $('.campaigns').append('<p>ID: '+ value['id'] + '</p>');
        //    $('.campaigns').append('<p>Title: '+ value['title'] + '</p>');
        //    $('.campaigns').append('<p>Start Date: '+ value['start'] + '</p>');
        //    $('.campaigns').append('<p>End Date: '+ value['end'] + '</p>');
        //    $('.campaigns').append('<p>Status: '+ value['status'] + '</p>');
        //});
        console.log(data);
        return data;

    });

    mockApi.getCampaigns().fail(function () {
        //$('.campaigns').append('<p>Oh no, something went wrong!<p>');
        console.log('Could not load data!');
    });
}

function getTacticsForCampaign() {
    mockApi.getTacticsForCampign().done(function (data) {

        //data.forEach(function (value) {
        //    $('.tactics').append('<br>');
        //    $('.tactics').append('<p>ID: '+ value['id'] + '</p>');
        //    $('.tactics').append('<p>Title: '+ value['title'] + '</p>');
        //    $('.tactics').append('<p>Start Date: '+ value['start'] + '</p>');
        //    $('.tactics').append('<p>End Date: '+ value['end'] + '</p>');
        //    $('.tactics').append('<p>Channel: '+ value['channel'] + '</p>');
        //    $('.tactics').append('<p>Description: '+ value['description'] + '</p>');
        //});

        console.log(data);
        return data;

    });

    mockApi.getTacticsForCampign().fail(function () {
        //$('.campaigns').append('<p>Oh no, something went wrong!<p>');
        console.log('Could not load data!');
    });
}



//$(document).ready(function ($) {
//
//    $('.campaigns a').click(function () {
//        getCampaigns();
//    });
//    $('.tactics a').click(function () {
//        getTacticsForCampaign();
//    });
//
//});





//var ul = $('<ul />');
//ul.append($('<li />', {text: 'Key: ' + value + ' ' + 'Value: ' + campaign}));
//console.log(value + ' -> ' + campaign);
//
//ul.append($('<li />', {text: 'Key: ' + test + ' ' + 'Value: ' + tactic}));
//console.log(test + ' -> ' + tactic);
//
//$('.campaigns').append(data);

//function buildJSON(data) {
//    for (var key in data) {
//        if (data.hasOwnProperty(key)) {
//            //alert(key + " -> " + data[key]);
//            var value = data[key];
//            console.log(value);
//            ul.append($('<li />', {text: 'Key: ' + key + ' ' + 'Value: ' + value}));
//            buildJSON(value);
//        }
//    }
//}
//buildJSON(data);

//for (var i = 0, len = data.length; i < len; i++) {
//    var campaign = data[i];
//    console.log(campaign);
//    ul.append($('<li />', {text: 'Key: ' + i + ' ' + 'Value: ' + campaign}));
//    for (var j in campaign) {
//        var tactic = campaign[j];
//        console.log(tactic);
//        ul.append($('<li />', {text: 'Key: ' + j + ' ' + 'Value: ' + tactic}));
//    }
//}
//
//return ul;

//var campaigns = Object.keys(data);
//
//campaigns.forEach(function(value) {
//
//    var campaign = data[value];
//    console.log(campaign);
//
//    var tactics = Object.keys(campaign);
//
//    tactics.forEach(function(test) {
//        var tactic = campaign[test];
//        console.log(tactic);
//
//    });
//
//});

//var ul = $('<ul />');
//
//$.each(data, function(key, value) {
//    ul.append(  $('<li />', {text: 'Key: ' + key + ' ' + 'Value: ' + value}) );
//});
//
//return ul;

//var parsedJSON = $.parseJSON(data);
//alert(parsedJSON);