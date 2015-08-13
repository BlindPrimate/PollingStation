'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope, $http, pollFactory, $modal, Auth, $state) {

    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.noPolls = true;

    pollFactory.getPolls().success (function (data) {
      $scope.noPolls = false;
      $scope.polls = data;
    }).error(function (err) {
      console.log(err);
    });

    $scope.newPoll = function () {
      $state.go('polls.new');
    }
  });
