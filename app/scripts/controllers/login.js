'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      locationId: '',
      userId: '',
      groupId: ''
    };
    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        if (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          $scope.initConnection();
          $scope.toggleLoginModal();
          if ($scope.debug) {
            console.log(AUTH_EVENTS.loginSuccess);
            console.log('Client ID: ' + user.clientId);
            console.log('Client API Key: ' + user.clientApiKey);
            console.log('Authenticated: ' + AuthService.isAuthenticated());
          }
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          if ($scope.debug) {
            console.log(AUTH_EVENTS.loginFailed);
            console.log('Client ID: null');
            console.log('Client API Key: null');
            console.log('Authenticated: ' + AuthService.isAuthenticated());
          }
        }
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
