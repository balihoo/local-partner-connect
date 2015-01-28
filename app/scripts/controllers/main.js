'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('MainCtrl', function ($scope) {
        //$scope.campaigns = [
        //    {
        //        'id': 34,
        //        'title': 'Test Campaign',
        //        'start' : '2014-05-02',
        //        'end': '2014-06-05',
        //        'status': 'active'
        //    },
        //    {
        //        'id': 23,
        //        'title': 'Another Campaign',
        //        'start' : '2014-01-02',
        //        'end': '2014-01-28',
        //        'status': 'active'
        //    }
        //];

        $scope.campaigns = getCampaigns();

        $scope.tactics = [
            {
                'id': 12,
                'title': 'Tactic Name',
                'start' : '2014-05-02',
                'end': '2014-06-05',
                'channel': 'Email',
                'description': 'A tactic description would go here if it exists'
            },
            {
                'id': 24,
                'title': 'Another Tactic Name',
                'start' : '2014-01-02',
                'end': '2014-01-12',
                'channel': 'Display',
                'description': 'Another tactic description would go here if it exists'
            }
        ];
  });
