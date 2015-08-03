'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope) {
    $scope.question = "Who was the best Bond?";
    $scope.options = [
      "Sean Connery",
      "Daniel Craig",
      "Roger Moore"
    ];

    $scope.removeOption = function(index) {
      $scope.options.splice(index, 1);
    };

    $scope.addOption = function () {
      $scope.options.push("option");
    }
  });
