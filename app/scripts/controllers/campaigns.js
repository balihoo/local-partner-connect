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

    $timeout(function() {
      if (AuthService.isAuthenticated())
        getCampaignData();
    }, 300);

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
