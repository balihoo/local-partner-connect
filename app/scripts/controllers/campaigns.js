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

        // API parameters - Move to a config file?
        var apiKey = 'a2f8624e-1594-47ed-9854-d0333e39d9cf';
        var brandKey= 'snap';
        var locationId = 'loc';
        var userId = 'user';
        var groupId ='group';

        // Instantiate an API object
        var client = new mockApi(apiKey, brandKey, locationId, userId, groupId);

        // Get all campaigns and their associated tactics
        $q.when(client.getCampaigns()).then(function(campaignsData) {
            $scope.selected = campaignsData[0];
            return $scope.campaigns = campaignsData;
        }).then(function(tacticsData) {
            $q.when(client.getTacticsForCampaign(tacticsData[0].id).then(function(data) {
                return $scope.tactics = data;
            }));
        });

        // Click listener for loading tactics
        $scope.loadTactics = function(id) {
            $q.when(client.getTacticsForCampaign(id).then(function(data) {
                return $scope.tactics = data;
            }));
        };

    }]);
