/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

'use strict';

var mockApi = {
    getCampaigns: function () {
        return $.getJSON('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', {type: 'getCampaigns'}).then(function (data) {

            return data;
        });
    },

    getTacticsForCampaign: function (campaignId) {
        return $.getJSON('http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php', {
            type: 'getTacticsForCampaign',
            param: campaignId
        }).then(function (data) {

            return data;
        });
    }
};
