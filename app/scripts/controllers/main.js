'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
    .controller('MainCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

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
