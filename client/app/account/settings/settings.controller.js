'use strict';

angular.module('votingAppApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, pollFactory) {
    $scope.errors = {};

    // returns and displays polls created by current user
    pollFactory.getUserPolls(Auth.getCurrentUser()._id).success(function (pollData) {
      if (pollData.length < 1) {
        $scope.polls = null;
      } else {
        $scope.polls = pollData; 
      }   
    });

    // deletes targeted poll from database
    $scope.deletePoll = function (target_id) {
      pollFactory.deletePoll(target_id).success(function () {
        $scope.polls = $scope.polls.filter(function (poll) {
          if (poll._id !== target_id) {
            return poll;
          }
        });
        if ($scope.polls.length < 1) {
          $scope.polls = null;
        }
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
