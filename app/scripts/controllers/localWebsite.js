'use strict';

/**
 * @ngdoc function
 * @name locationPluginApp.controller:LocalWebsiteController
 * @description
 * # LocalWebsiteController
 * Controller of the locationPluginApp
 */
angular.module('locationPluginApp')
  .controller('LocalWebsiteController', [
    '$scope',
    '$rootScope',
    '$q',
    '$window',
    '$timeout',
    'AuthService',

  function ($scope, $rootScope, $q, $window, $timeout, AuthService) {

    $timeout(function() {
      if (AuthService.isAuthenticated())
        getLocalWebsiteData();
      else
        $('#timeoutModal').modal().show()
    }, 300);

    function getLocalWebsiteData() {
      $q.when($scope.connection.getWebsiteMetrics())
        .then(function (websiteMetrics) {
          if (!websiteMetrics) {
            $('#localWebsiteModal').modal().show()
            $('#localWebsiteModal').on('hidden.bs.modal', function (){
              $window.location.reload();
            });
            throw new Error("No local website data was found");
          }
          visitsChart.load({
            columns: [
              ['Organic', websiteMetrics.visits.organic],
              ['Direct', websiteMetrics.visits.direct],
              ['Referral', websiteMetrics.visits.referral],
              ['Paid', websiteMetrics.visits.paid]
            ]
          });
          $('#visits-chart .c3-chart-arcs-title').html(
            '<tspan x="0" dy="0em">' + websiteMetrics.visits.total + ' Visits' + '</tspan>' +
            '<tspan x="0" dy="1.25em">' + '(' + Math.round(websiteMetrics.visits.newVisitsPercent * 100) + '% new)' + '</tspan>'
          );
          leadsChart.load({
            columns: [
              ['Web (Organic)', websiteMetrics.leads.organicWeb],
              ['Web (Paid)', websiteMetrics.leads.paidWeb],
              ['Phone (Organic)', websiteMetrics.leads.organicPhone],
              ['Phone (Paid)', websiteMetrics.leads.paidPhone],
            ]
          });
          $('#leads-chart .c3-chart-arcs-title').text(websiteMetrics.leads.total + ' Leads');
          return $scope.websiteMetrics = websiteMetrics;
        })
        .catch(function(response) {
          if (response.status === 404) {
            $('#timeoutModal').modal().show()
          }
        });
    }

  }]);
