'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:CampaignController
 * @description
 * # CampaignController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('CampaignController', function ($scope, $rootScope, $window, $http, $q, $timeout, AUTH_EVENTS, AuthService) {

    //$.ajaxSetup({
    //  error: function(jqXHR, textStatus, errorThrown) {
    //    if (jqXHR.status === 404) {
    //      console.log('Your API session has expired!');
    //      $window.location.reload();
    //    }
    //  }
    //});

    if (AuthService.isAuthenticated()) {
      //$http.post('http://bac.dev.balihoo-cloud.com/localdata/v1.0/campaigns', {clientId: 'd9d36d9c-94ce-4263-83e5-fdcc34fe81b4', clientApiKey: '5c7cd03c-34ba-4374-a451-06a9d39b731a'})
      //  .then(function(response) {
      //    console.log(response);
      //  });
      getCampaignData();
    } else {
      $scope.toggleLoginModal();
      $('#loginForm').submit(function() {
        $timeout(function() {
          if (AuthService.isAuthenticated())
            getCampaignData();
        }, 1000);
      });
    }

    function getCampaignData() {
      $q.when($scope.connection.getAllCampaigns())
        .then(function (allCampaigns) {
          if (!allCampaigns[0]) {
            $scope.toggleCampaignModal();
            $('#campaignModal').on('hidden.bs.modal', function (){
              $window.location.reload();
            });
            throw new Error("No campaigns were found");
          }
          $scope.selected = allCampaigns[0];
          return $scope.campaigns = allCampaigns;
        })
        .then(function (campaigns) {
          $q.when($scope.connection.getAllTactics(campaigns[0].id))
            .then(function (allTactics) {
              return $scope.tactics = allTactics.tactics;
            })
            .then(function (tactics) {
              angular.forEach(tactics, function(tactic, key) {
                $q.when($scope.connection.getMetricsForTactic(tactic.id))
                  .then(function (metrics) {
                    angular.extend($scope.tactics[key], metrics);
                  })
              })
            });
        })
        .catch(function(response) {
          if (response.status == 404) {
            $window.location.reload();
          }
        });

      // Click listener for loading tactics
      $scope.loadTactics = function(id) {
        $q.when($scope.connection.getAllTactics(id))
          .then(function (allTactics) {
            return $scope.tactics = allTactics.tactics;
          })
          .then(function (tactics) {
            angular.forEach(tactics, function(tactic, key) {
              $q.when($scope.connection.getMetricsForTactic(tactic.id))
                .then(function (metrics) {
                  angular.extend($scope.tactics[key], metrics);
                })
            })
          })
          .catch(function(response) {
            if (response.status == 404) {
              $window.location.reload();
            }
          });
      };
    }

  });

////API parameters - Move to a config file?
//var apiKey = '81636bdb-d1ef-4364-8b57-bf7683ded94b';
//var brandKey = 'dental';
//var locationId = '27';
//var userId = 'user';
//var groupId = 'group';
//
//var getClientCreds = function (apiKey, brandKey, locationId, userId, groupId) {
//  var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/clientAuth.php';
//
//  return $.ajax({
//    type: 'POST',
//    url: url,
//    data: {
//      apiKey: apiKey,
//      brandKey: brandKey,
//      locationId: locationId,
//      userId: userId,
//      groupId: groupId
//    },
//    async: true,
//    dataType: 'json'
//  });
//};

//$q.when(getClientCreds(apiKey, brandKey, locationId, userId, groupId))
//  .then(function (clientCreds) {
//    var connection = new balihoo.LocalConnection(clientCreds.clientId, clientCreds.clientApiKey);
//    return $scope.connection = connection;
//  })
//  .then(function (connection) {
