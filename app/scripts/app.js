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
            controller: 'CampaignCtrl'
          })
          .when('/localWebsite', {
            templateUrl: 'views/localWebsite.html',
            controller: 'LocalWebsiteCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    })
    .controller('MainCtrl', function($scope, $rootScope, $location) {
        $scope.menu = [
            {label: 'Campaigns', route: '/campaigns'},
            {label: 'Local Website', route: '/localWebsite'}
        ]

        $scope.menuActive = '/';

        $rootScope.$on('$routeChangeSuccess', function() {
           $scope.menuActive = $location.path();
        });
    });

function Authentication() {
    return {
        authenticate: function () {
            $q.when(mockApi.getClientAPIKey()).then(function (authenticationData) {
                return authenticationData;
            });

        }
    };
}