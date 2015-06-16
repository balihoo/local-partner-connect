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
    '$route',
    'AuthService',

  function ($scope, $rootScope, $q, $window, $timeout, $route, AuthService) {

    var form;
    var model;
    var outputData;

    $timeout(function() {
      if (AuthService.isAuthenticated()) {
        getProfileData();
      }
      else
        $('#timeoutModal').modal().show()
    }, 600);

    function getProfileData() {
      $q.when($scope.connection.getProfileData())
        .then(function (profileData) {
          return $scope.profileData = profileData;
        })
        .then(function (profileData) {
          $q.when($scope.connection.getProfileForm())
            .then(function (profileForm) {
              loadForm(profileForm, profileData);
              return $scope.profileForm = profileForm;
            })
        })
        .catch(function(response) {
          if (response.status == 0) {
            $('#timeoutModal').modal().show()
          }
        });
    }

    function loadForm(profileForm, profileData) {
      form = $('#formTarget');

      form.renderForm(profileForm)
        .fail(function(){
          $('#formTarget').text('Unable to render form. Please try again later.');
        }).done(function(){
          model = this;
          formbuilder.applyData(model, profileData);
          updateData();
        });

      $('#updateDataButton').click(updateData);
      $('#sendDataButton').click(sendData);
    }

    function updateData() {
      outputData = model.buildOutputData();
      $('#outgoingData').val(JSON.stringify(outputData));
    }

    function sendData() {
      outputData = model.buildOutputData();
      $q.when($scope.connection.updateProfileData(outputData))
        .then(function () {
          $route.reload();
        })
    }

  }]);
