/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

'use strict';

var apiKey = 'a2f8624e-1594-47ed-9854-d0333e39d9cf';
var brandKey= 'snap';
var locationId = 'loc';
var userId = 'user';
var groupId ='group';

var mockApi = {

    getClientAPIKey: function() {
        return $.post('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', { apiKey: apiKey, brandKey: brandKey, locationId: locationId, userId: userId, groupId: groupId }, 'json' ).then( function(data) {
            console.log(data);
        });
    },

    getCampaigns: function() {
        return $.getJSON('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', {type: 'getCampaigns'}).then( function(data) {
            return data;
        });
    },

    getTacticsForCampaign: function(campaignId) {
        return $.getJSON('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', {
            type: 'getTacticsForCampaign',
            param: campaignId
        }).then( function(data) {
            return data;
        });
    }
};
