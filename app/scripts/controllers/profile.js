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
    }, 300);

    function getProfileData() {
      console.log('ProfileController: Authenticated');
    }

  }]);
