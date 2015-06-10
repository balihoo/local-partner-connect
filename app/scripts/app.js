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
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('ApplicationController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    'Session',
    'AuthService',
    'AUTH_EVENTS',

    function($scope, $rootScope, $http, $location, Session, AuthService, AUTH_EVENTS) {

    $scope.menu = [
      {label: 'Campaigns', route: '/'},
      {label: 'Local Website', route: '/localWebsite'},
      {label: 'Profile', route: '/profile'}
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

    // For testing purposes and debug output
    var testFlag = $location.search().test;

    var credentials = {
      brandKey: $location.search().brandKey,
      apiKey: testFlag ? $location.search().apiKey : null,
      clientId: $location.search().clientId,
      clientApiKey: $location.search().clientApiKey,
      locationKey: $location.search().locationKey,
      userId: $location.search().userId,
      groupId: $location.search().groupId
    };

    // Used in Google Analytics (index.html)
    $scope.brandKey = credentials.brandKey;
    $scope.locationKey = credentials.locationKey;
    $scope.gaEvent = function(category) {
      ga('send', 'event', category, 'Click Link');;
    };

    if (testFlag) {
      AuthService.login(credentials).then(function (user) {
        if (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          $scope.initConnection();
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    } else {
      var user = AuthService.login(credentials);
      if (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        $scope.initConnection();
      } else {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  }])
  .service('Session', function () {
    this.create = function (clientId, clientApiKey) {
      this.clientId = clientId;
      this.clientApiKey = clientApiKey;
      this.connection = new balihoo.LocalConnection(clientId, clientApiKey);
    };
    this.destroy = function () {
      this.clientId = null;
      this.clientApiKey = null;
    };
  })
  .factory('AuthService', function ($http, $location, Session) {
    var authService = {};
    var testFlag = $location.search().test;

    authService.login = function (credentials) {
      if (testFlag) {
        var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/clientAuth.php';
        return $http({
          method: 'POST',
          url: url,
          data: $.param(credentials),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
          .then(function (response) {
            if (response.data.clientId) {
              Session.create(response.data.clientId, response.data.clientApiKey);
              console.log('ClientID: ' + response.data.clientId);
              console.log('ClientAPIKey: ' + response.data.clientApiKey);
              return response.data;
            }
          });
      } else {
        Session.create(credentials.clientId, credentials.clientApiKey);
        return credentials.clientId;
      }
    };

    authService.isAuthenticated = function () {
      return !!Session.clientId;
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
  .directive('tooltip', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).hover(function() {
          $(element).tooltip('show');
        }, function() {
          $(element).tooltip('hide');
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
