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

    if (AuthService.isAuthenticated()) {
      getLocalWebsiteData();
    } else {
      $scope.toggleLoginModal();
      $('#loginForm').submit(function() {
        $timeout(function() {
          if (AuthService.isAuthenticated())
            getLocalWebsiteData();
        }, 500);
      });
    }

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
          return $scope.websiteMetrics = websiteMetrics;
        })
        .catch(function(response) {
          if (response.status == 404) {
            $window.location.reload();
          }
        });
    }

  });
