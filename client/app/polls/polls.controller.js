'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope, $http, pollFactory, $modal, Auth, $state) {

    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.polls = null;


    pollFactory.getPolls().success (function (data) {
      if (data.length > 0) {
        $scope.polls = data;
      }
    }).error(function (err) {
      console.log(err);
    });

    $scope.newPoll = function () {
      $state.go('polls.new');
    }
  });
