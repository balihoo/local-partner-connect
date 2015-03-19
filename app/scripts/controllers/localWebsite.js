'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:LocalWebsiteController
 * @description
 * # LocalWebsiteController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('LocalWebsiteController', function ($scope, $rootScope, $q, $window, $timeout, AUTH_EVENTS, AuthService) {

    $timeout(function() {
      if (AuthService.isAuthenticated())
        getLocalWebsiteData();
      else
        $scope.timeoutModalOn();
    }, 300);

    function getLocalWebsiteData() {
      $q.when($scope.connection.getWebsiteMetrics())
        .then(function (websiteMetrics) {
          if (!websiteMetrics) {
            $scope.toggleLocalWebsiteModal();
            $('#localWebsiteModal').on('hidden.bs.modal', function (){
              $window.location.reload();
            });
            throw new Error("No local website data was found");
          }
          visitsChart.load({
            columns: [
              ['Organic', websiteMetrics.visits.organic],
              ['Direct', websiteMetrics.visits.direct],
              ['Referral', websiteMetrics.visits.referral]
            ]
          });
          leadsChart.load({
            columns: [
              ['Web', websiteMetrics.leads.web],
              ['Phone', websiteMetrics.leads.phone]
            ]
          });
          return $scope.websiteMetrics = websiteMetrics;
        })
        .catch(function(response) {
          if (response.status == 404) {
            $scope.timeoutModalOn();
          }
        });
    }

  });
