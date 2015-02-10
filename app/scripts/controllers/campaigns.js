'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
    .controller('CampaignCtrl', ['$scope', '$q', function ($scope, $q) {
        var client = new MockApi();

        // Add authentication service in app.js? -jlutz

        //this.authenticateClient = function(client) {
        //    return AuthenticationService.authenticate(client)
        //        .then(function(response) {
        //            return response;
        //        });
        //};
        //console.log(this.authenticateClient(client));

        $q.when(client.getClientAPIKey()).then(function(clientData) {
            $scope.clientData = clientData;
            return clientData;
        }).then(function(clientData) {
            // Get all campaigns and their associated tactics
            $q.when(client.getCampaigns(clientData.clientId, clientData.clientApiKey)).then(function (campaignsData) {
                $scope.selected = campaignsData[0];
                return $scope.campaigns = campaignsData;
            }).then(function (tacticsData) {
                $q.when(client.getTacticsForCampaign(tacticsData[0].id, clientData.clientId, clientData.clientApiKey).then(function (data) {
                    return $scope.tactics = data.tactics;
                }));
            });
        });

        // Click listener for loading tactics
        $scope.loadTactics = function(id) {
            $q.when(client.getTacticsForCampaign(id, $scope.clientData.clientId, $scope.clientData.clientApiKey).then(function(data) {
                return $scope.tactics = data.tactics;
            }));
        };
    }]);
