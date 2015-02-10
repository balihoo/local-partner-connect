/**
 * Balihoo Location Plugin Test
 * Created by jlutz on 1/21/15.
 */

'use strict';

function MockApi() {

    // API parameters - Move to a config file?
    this.apiKey = '4b5a4def-e6e2-433d-aa75-9ccfb4652563';
    this.brandKey= 'dental';
    this.locationId = '5551212';
    this.userId = 'user';
    this.groupId ='group';

    this.getClientAPIKey = function() {
        var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php';

        return $.ajax({
            type: 'POST',
            url: url,
            data: {
                apiKey: this.apiKey,
                brandKey: this.brandKey,
                locationId: this.locationId,
                userId: this.userId,
                groupId: this.groupId
            },
            async: true,
            dataType: 'json'
        });
    };

    this.getCampaigns = function(clientId, clientApiKey) {
        var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php';

        return $.ajax({
            type: 'GET',
            url: url,
            data: {type: 'getCampaigns', clientId: clientId, clientApiKey: clientApiKey},
            async: true,
            jsonpCallback: 'campaignData',
            contentType: "application/json",
            dataType: 'jsonp'
        });
    };

    this.getTacticsForCampaign = function(campaignId, clientId, clientApiKey) {
        var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/mockApi.php';

        return $.ajax({
            type: 'GET',
            url: url,
            data: {type: 'getTacticsForCampaign', campaignId: campaignId, clientId: clientId, clientApiKey: clientApiKey},
            async: true,
            jsonpCallback: 'tacticData',
            contentType: "application/json",
            dataType: 'jsonp'
        });
    };
}
