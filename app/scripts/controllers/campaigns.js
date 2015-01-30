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

        $q.when(mockApi.getCampaigns()).then(function(campaignsData) {
            return $scope.campaigns = campaignsData;
        }).then(function(tacticsData) {
            $q.when(mockApi.getTacticsForCampaign(tacticsData[0].id).then(function(data) {
                return $scope.tactics = data;
            }));
        });

        $scope.loadTactics = function(id) {
            $q.when(mockApi.getTacticsForCampaign(id).then(function(data) {
                return $scope.tactics = data;
            }));
        };
    }]);
