'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope, $http) {

    $http.get('/api/polls').success(function(data) {
      $scope.polls = data;
    })

  });
