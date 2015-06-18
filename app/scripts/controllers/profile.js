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
    var saveProfileButton;

    $timeout(function() {
      if (AuthService.isAuthenticated())
        getProfileData();
      else
        $('#timeoutModal').modal().show()
    }, 600);

    function getProfileData() {
      $q.when($scope.connection.getProfileData())
        .then(function (profileData) {
          return profileData;
        })
        .then(function (profileData) {
          $q.when($scope.connection.getProfileForm())
            .then(function (profileForm) {
              loadForm(profileForm, profileData);
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
      saveProfileButton = $('#saveProfileButton');

      form.renderForm(profileForm)
        .fail(function(){
          $('#formPanel').removeClass('hidden');
          $('#formTarget').text('Unable to render form. Please try again later.');
        }).done(function(){
          model = this;
          formbuilder.applyData(model, profileData);
          $('#formPanel').removeClass('hidden');
          saveProfileButton.removeClass('hidden');
          saveProfileButton.click(sendData);
        });
    }

    function sendData() {
      saveProfileButton.addClass('hidden');
      $('#formTarget').text('Saving profile. Please wait...');
      outputData = model.buildOutputData();
      $q.when($scope.connection.updateProfileData(outputData))
        .then(function () {
          getProfileData();
        })
        .catch(function(response) {
          if (response.status == 0) {
            $('#formTarget').text('Error saving profile. Please try again later.');
            $('#timeoutModal').modal().show();
          }
        });
    }
  }]);
