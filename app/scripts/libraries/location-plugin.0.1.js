/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

'use strict';

function mockApi(apiKey, brandKey, locationId, userId, groupId) {

    this.apiKey = apiKey;
    this.brandKey = brandKey;
    this.locationId = locationId;
    this.userId = userId;
    this.groupId = groupId;

    this.getClientAPIKey = function() {
        return $.post('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', { apiKey: apiKey, brandKey: brandKey, locationId: locationId, userId: userId, groupId: groupId }, 'json' ).then( function(data) {
            console.log(data);
        });
    };

    this.getCampaigns = function() {
        return $.getJSON('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', {type: 'getCampaigns'}).then( function(data) {
            return data;
        });
    };

    this.getTacticsForCampaign = function(campaignId) {
        return $.getJSON('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', {
            type: 'getTacticsForCampaign',
            param: campaignId
        }).then( function(data) {
            return data;
        });
    };
}
