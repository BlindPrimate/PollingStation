'use strict';

angular.module('votingAppApp')
  .controller('PollCtrl', function ($stateParams, $http, $scope) {

    $http.get('api/polls/' + $stateParams.id).success(function (data) {
      $scope.poll = data;
    });
  });
