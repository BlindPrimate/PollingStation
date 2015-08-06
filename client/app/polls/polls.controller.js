'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope, $http, pollFactory) {

    pollFactory.getPolls().success (function (data) {
      $scope.polls = data;
    }).error(function (err) {
      console.log(err);
    });


  });
