'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
