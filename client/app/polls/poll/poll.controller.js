'use strict';

angular.module('votingAppApp')
  .controller('PollCtrl', function ($stateParams, $http, $scope) {

    var pollApi = 'api/polls/' + $stateParams.id;

    $http.get(pollApi).success(function (data) {
      $scope.poll = data;
    });

    $scope.currChoice = '';

    $scope.submitVote = function (optionIndex) {
      $scope.poll.options[optionIndex].votes += 1;
      $http.put(pollApi, $scope.poll)
    }



  });
