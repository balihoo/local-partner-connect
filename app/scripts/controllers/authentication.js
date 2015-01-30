'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:AuthenticationCtrl
 * @description
 * # AuthenticationCtrl
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
    .controller('AuthenticationCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {


        mockApi.getBrandAPIKey;

        //$q.when(mockApi.getCampaigns()).then(function(campaignsData) {
        //    return $scope.campaigns = campaignsData;
        //}).then(function(tacticsData) {
        //    $q.when(mockApi.getTacticsForCampaign(tacticsData[0].id).then(function(data) {
        //        return $scope.tactics = data;
        //    }));
        //});

    }]);