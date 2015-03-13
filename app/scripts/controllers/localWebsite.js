'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:LocalWebsiteController
 * @description
 * # LocalWebsiteController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('LocalWebsiteController', function ($scope, $rootScope, $timeout, AUTH_EVENTS, AuthService) {

    //$q.when(connection.getWebsiteMetrics())
    //  .then(function (websiteMetrics) {
    //    console.log(websiteMetrics);
    //  });

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
      console.log('This is a test!');
    }

  });
