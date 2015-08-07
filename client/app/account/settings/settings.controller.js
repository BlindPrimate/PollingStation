'use strict';

angular.module('votingAppApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, pollFactory) {
    $scope.errors = {};


    console.log(Auth.getCurrentUser()._id);
    pollFactory.getUserPolls(Auth.getCurrentUser()._id).success(function (pollData) {
      if (jQuery.isEmptyObject(pollData)) {
        $scope.polls = null;
      } else {
        $scope.polls = pollData; 
      }   
    });


    $scope.deletePoll = function (target_id) {
      pollFactory.deletePoll(target_id).success(function () {
        $scope.polls = $scope.polls.filter(function (poll) {
          if (poll._id !== target_id) {
            return poll;
          }
        });
      });
    }

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
