'use strict';

/**
 * @ngdoc overview
 * @name locationPluginApp
 * @description
 * # locationPluginApp
 *
 * Main module of the application.
 */
angular
  .module('locationPluginApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignController'
      })
      .when('/localWebsite', {
        templateUrl: 'views/localWebsite.html',
        controller: 'LocalWebsiteController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('ApplicationController', function($scope, $rootScope, $http, $location, Session, AuthService, AUTH_EVENTS) {
    $scope.debug = false;

    var credentials = {
      locationId: '475343',
      userId: 'aamco',
      groupId: 'aamco'
    };

    AuthService.login(credentials).then(function (user) {
      if (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        $scope.initConnection();
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

    $scope.menu = [
      {label: 'Campaigns', route: '/'},
      {label: 'Local Website', route: '/localWebsite'}
    ];

    $scope.menuActive = '/';

    $rootScope.$on('$routeChangeSuccess', function() {
      $scope.menuActive = $location.path();
    });

    $scope.currentUser = null;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };

    $scope.initConnection = function () {
      $scope.connection = Session.connection;
    };

    $scope.showLoginModal = false;
    $scope.toggleLoginModal = function(){
      $scope.showLoginModal = !$scope.showLoginModal;
    };
    $scope.showCampaignModal = false;
    $scope.toggleCampaignModal = function(){
      $scope.showCampaignModal = !$scope.showCampaignModal;
    };
    $scope.showLocalWebsiteModal = false;
    $scope.toggleLocalWebsiteModal = function(){
      $scope.showLocalWebsiteModal = !$scope.showLocalWebsiteModal;
    };
  })
  .service('Session', function () {
    this.create = function (clientId, clientApiKey) {
      this.clientId = clientId;
      this.clientApiKey = clientApiKey;
      this.connection = new balihoo.LocalConnection(clientId, clientApiKey);

      //For testing expired API key
      //this.connection = new balihoo.LocalConnection('d9d36d9c-94ce-4263-83e5-fdcc34fe81b4', '5c7cd03c-34ba-4374-a451-06a9d39b731a');
    };
    this.destroy = function () {
      this.clientId = null;
      this.clientApiKey = null;
    };
  })
  .factory('AuthService', function ($http, Session) {
    var authService = {};

    authService.login = function (credentials) {
      var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/clientAuth.php';

      //API parameters - Move to a config file?
      credentials = {
        //DEV
        //apiKey: '81636bdb-d1ef-4364-8b57-bf7683ded94b',
        //brandKey: 'dental',
        apiKey: '05b576d2-e895-4846-9951-4a8206a74347',
        brandKey: 'aamco',
        locationId: credentials.locationId,
        userId: credentials.userId,
        groupId: credentials.groupId
      };

      return $http({
        method: 'POST',
        url: url,
        data: $.param(credentials),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function (response) {
          if (response.data.clientId) {
            Session.create(response.data.clientId, response.data.clientApiKey);
            return response.data;
          }
        });
    };

    authService.isAuthenticated = function () {
      return !!Session.clientId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
  })
  .directive('modal', function () {
    return {
      restrict: 'E',
      template: '<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header {{ type }}">' +
      '<h4 class="modal-title">{{ title }}</h4>' +
      '</div>' +
      '<div class="modal-body" ng-transclude></div>' +
      '</div>' +
      '</div>' +
      '</div>',
      transclude: true,
      replace:true,
      scope:true,
      link: function (scope, element, attrs) {

        scope.type = attrs.type;
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value === true) {
            $(element).modal('show');
          }
          else {
            $(element).modal('hide');
          }
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  });
