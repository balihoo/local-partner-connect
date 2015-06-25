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
    var saveProfileButton = $('#saveProfileButton');
    saveProfileButton.click(sendData);

    $timeout(function() {
      if (AuthService.isAuthenticated())
        getProfileData();
      else
        $('#timeoutModal').modal().show()
    }, 600);

    function getProfileData(saved) {
      $q.when($scope.connection.getProfileData())
        .then(function (profileData) {
          return profileData;
        })
        .then(function (profileData) {
          $q.when($scope.connection.getProfileForm())
            .then(function (profileForm) {
              loadForm(profileForm, profileData);
              if (saved) {
                $('#formContainer').prepend('<div id="saveInfo" role="alert"></div>');
                $('#saveInfo').addClass('alert alert-success');
                $('#saveInfo').append("<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
                $('#saveInfo').append("<p>Profile Saved!</p>");
              }
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
          $('#formPanel').removeClass('panel panel-default hidden');
          $('#formTarget').addClass('alert alert-danger');
          $('#formTarget').text('Unable to render form. Please try again later.');
        }).done(function(){
          model = this;
          formbuilder.applyData(model, profileData);
          $('#formPanel').removeClass('hidden');
          saveProfileButton.removeClass('hidden');
        });
    }

    function sendData() {
      $('#saveInfo').remove();
      saveProfileButton.addClass('hidden');
      $('#formTarget').text('Saving profile. Please wait...');
      outputData = model.buildOutputData();
      $q.when($scope.connection.updateProfileData(outputData))
        .then(function () {
          var saved = true;
          getProfileData(saved);
        })
        .catch(function(response) {
          $('#formTarget').text('');
          $('#formPanel').removeClass('panel panel-default hidden');
          $('#formContainer').prepend('<div id="saveInfo" role="alert"></div>');
          $('#saveInfo').addClass('alert alert-danger');
          $('#saveInfo').append("<p>Error saving profile. Please try again later.</p>");
          //$('#saveInfo').addClass('alert alert-danger');
          //$('#saveInfo').text('Error saving profile. Please try again later.');
          if (response.status == 0) {
            $('#timeoutModal').modal().show();
          }
        });
    }
  }]);
