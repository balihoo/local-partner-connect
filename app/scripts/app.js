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
  .config(function ($routeProvider, $httpProvider) {
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

    //$httpProvider.interceptors.push([
    //  '$injector',
    //  function ($injector) {
    //    return $injector.get('AuthInterceptor');
    //  }
    //]);
    //$httpProvider.interceptors.push('AuthInterceptor');

  })
  .controller('ApplicationController', function($scope, $rootScope, $http, $location, USER_ROLES, Session, AuthService) {
    $scope.debug = true;

    $scope.menu = [
      {label: 'Campaigns', route: '/'},
      {label: 'Local Website', route: '/localWebsite'}
    ];

    $scope.menuActive = '/';

    $rootScope.$on('$routeChangeSuccess', function() {
      $scope.menuActive = $location.path();
    });

    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
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

      //this.userRole = userRole;
    };
    this.destroy = function () {
      this.clientId = null;
      this.clientApiKey = null;
      //this.userRole = null;
    };
  })
  .factory('AuthService', function ($http, Session) {
    var authService = {};

    //var apiKey = '81636bdb-d1ef-4364-8b57-bf7683ded94b';
    //var brandKey = 'dental';
    //var locationId = '27';
    //var userId = 'user';
    //var groupId = 'group';

    authService.login = function (credentials) {
      var url = 'http://localhost:8888/location-plugin/app/scripts/libraries/clientAuth.php';

      //API parameters - Move to a config file?
      credentials = {
        apiKey: '81636bdb-d1ef-4364-8b57-bf7683ded94b',
        brandKey: 'dental',
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
  //.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  //
  //  return {
  //    response: function (response) {
  //      if (response.status === 404) {
  //        console.log('AuthInterceptor used!!!');
  //        console.log('Response: ' + response.status);
  //        return $q.reject(response);
  //      }
  //      console.log('AuthInterceptor used!!!');
  //      console.log('Response: ' + response.status);
  //      //$rootScope.$broadcast({
  //      //  401: AUTH_EVENTS.notAuthenticated,
  //      //  403: AUTH_EVENTS.notAuthorized
  //      //}[response.status], response);
  //      return response;
  //    },
  //
  //    responseError: function (response) {
  //      console.log('AuthInterceptor used!!!');
  //      console.log('Response: ' + response.status);
  //      $rootScope.$broadcast({
  //        401: AUTH_EVENTS.notAuthenticated,
  //        403: AUTH_EVENTS.notAuthorized
  //      }[response.status], response);
  //      return $q.reject(response);
  //    }
  //  };
  //
  //})
  .directive('modal', function () {
    return {
      restrict: 'E',
      template: '<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header {{ type }}">' +
        //'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
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
        scope.closeButton = attrs.closeButton;
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
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

        //var showDialog = function () {
        //  scope.visible = true;
        //  $('#loginModal').modal('show');
        //};
        //
        //var hideDialog = function () {
        //  scope.visible = false;
        //};
        //
        //scope.visible = false;
        //scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
        //scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
        //scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
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
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  });
