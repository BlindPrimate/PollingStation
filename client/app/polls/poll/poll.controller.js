'use strict';

angular.module('votingAppApp')
  .controller('PollCtrl', function ($scope, $stateParams, $http, pollFactory) {


    pollFactory.getPoll($stateParams.id).success(function (data) {
      $scope.poll = data;
    });

    $scope.currChoice = '';


    
    $scope.submitVote = function (choice) {
      pollFactory.changeVote($stateParams.id, choice);
    }



  });
