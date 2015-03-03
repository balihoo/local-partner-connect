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

    //API parameters - Move to a config file?
    var apiKey = '81636bdb-d1ef-4364-8b57-bf7683ded94b';
    var brandKey = 'dental';
    var locationId = '27';
    var userId = 'user';
    var groupId = 'group';

    var getClientCreds = function (apiKey, brandKey, locationId, userId, groupId) {
      var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/clientAuth.php';

      return $.ajax({
        type: 'POST',
        url: url,
        data: {
          apiKey: apiKey,
          brandKey: brandKey,
          locationId: locationId,
          userId: userId,
          groupId: groupId
        },
        async: true,
        dataType: 'json'
      });
    };

    $q.when(getClientCreds(apiKey, brandKey, locationId, userId, groupId))
      .then(function (clientCreds) {
        var connection = new balihoo.LocalConnection(clientCreds.clientId, clientCreds.clientApiKey);
        return $scope.connection = connection;
      })
      .then(function (connection) {
        $q.when(connection.getAllCampaigns())
          .then(function (allCampaigns) {
            $scope.selected = allCampaigns[0];
            return $scope.campaigns = allCampaigns;
          })
          .then(function (campaigns) {
            $q.when(connection.getAllTactics(campaigns[0].id))
              .then(function (allTactics) {
                return $scope.tactics = allTactics.tactics;
              })
              .then(function (tactics) {
                angular.forEach(tactics, function(tactic, key) {
                  $q.when(connection.getMetricsForTactic(tactic.id))
                    .then(function (metrics) {
                      angular.extend($scope.tactics[key], metrics);
                    })
                })
              });
          });

        // Click listener for loading tactics
        $scope.loadTactics = function(id) {
          $q.when($scope.connection.getAllTactics(id))
            .then(function (allTactics) {
              return $scope.tactics = allTactics.tactics;
            })
            .then(function (tactics) {
              angular.forEach(tactics, function(tactic, key) {
                $q.when(connection.getMetricsForTactic(tactic.id))
                  .then(function (metrics) {
                    angular.extend($scope.tactics[key], metrics);
                  })
              })
            });
        };

      });

  }]);
