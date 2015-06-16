'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:CampaignController
 * @description
 * # CampaignController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('CampaignController', [
    '$scope',
    '$rootScope',
    '$window',
    '$http',
    '$q',
    '$timeout',
    'AuthService',

    function ($scope, $rootScope, $window, $http, $q, $timeout, AuthService) {

      $timeout(function() {
        if (AuthService.isAuthenticated()) {
          loadTabs();
          getCampaignData();
        }
        else {
          $('#timeoutModal').modal().show()
        }
      }, 600);

      function loadTabs() {
        $q.when($scope.connection.getWebsiteMetrics())
          .then(function (websiteMetrics) {
            if ((websiteMetrics.visits.total + websiteMetrics.leads.total == 0) && ($scope.menu[1].label == 'Local Website')) {
              $scope.menu.splice(1, 1);
              $window.location = '#/';
            }
          });
      }

      function getCampaignData() {
        $q.when($scope.connection.getAllCampaigns())
          .then(function (allCampaigns) {
            if (!allCampaigns[0]) {
              $scope.menu.splice(0, 1);
              $window.location = '#/localWebsite';
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
            if (response.status == 0) {
              $('#timeoutModal').modal().show()
            }
          });

        // Click listener for loading tactics
        $scope.loadTactics = function(id) {
          if (AuthService.isAuthenticated()) {
            $q.when($scope.connection.getAllTactics(id))
              .then(function (allTactics) {
                return $scope.tactics = allTactics.tactics;
              })
              .then(function (tactics) {
                angular.forEach(tactics, function (tactic, key) {
                  $q.when($scope.connection.getMetricsForTactic(tactic.id))
                    .then(function (metrics) {
                      angular.extend($scope.tactics[key], metrics);
                    })
                })
              })
              .catch(function (response) {
                if (response.status == 0) {
                  $('#timeoutModal').modal().show()
                }
              });
          } else {
            $('#timeoutModal').modal().show()
          }
        };
      }

    }]);
