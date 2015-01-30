'use strict';

/**
 * @ngdoc overview
 * @name locationPluginApp
 * @description
 * # locationPluginApp
 *
 * Main module of the application.
 */
angular
    .module('locationPluginApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch'
    ])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/campaigns.html',
            controller: 'CampaignCtrl'
          })
          .when('/about', {
            templateUrl: 'views/localWebsite.html',
            controller: 'LocalWebsiteCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    })
    .controller('AuthenticationCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

      mockApi.getBrandAPIKey();

      //$q.when(mockApi.getCampaigns()).then(function(campaignsData) {
      //    return $scope.campaigns = campaignsData;
      //}).then(function(tacticsData) {
      //    $q.when(mockApi.getTacticsForCampaign(tacticsData[0].id).then(function(data) {
      //        return $scope.tactics = data;
      //    }));
      //});

    }]);
