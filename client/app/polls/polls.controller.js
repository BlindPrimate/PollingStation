'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope, $http) {

    $http.get('/api/poll').success(function (data) {
      $scope.polls = data;
    });

  });
