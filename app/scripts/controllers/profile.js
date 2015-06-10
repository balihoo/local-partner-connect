'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:ProfileController
 * @description
 * # ProfileController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('ProfileController', [
    '$scope',
    '$rootScope',
    '$q',
    '$window',
    '$timeout',
    'AuthService',

  function ($scope, $rootScope, $q, $window, $timeout, AuthService) {

    $timeout(function() {
      if (AuthService.isAuthenticated())
        getProfileData();
      else
        $('#timeoutModal').modal().show()
    }, 600);

    function getProfileData() {
      $q.when($scope.connection.getProfileData())
        .then(function (profileData) {
          return $scope.profileData = profileData;
        })
        .catch(function(response) {
          if (response.status === 404) {
            $('#timeoutModal').modal().show()
          }
        });
    }

  }]);
