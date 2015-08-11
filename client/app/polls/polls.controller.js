'use strict';

angular.module('votingAppApp')
  .controller('PollsCtrl', function ($scope, $http, pollFactory, $modal, Auth, $state) {

    $scope.isLoggedIn = Auth.isLoggedIn();


    pollFactory.getPolls().success (function (data) {
      $scope.polls = data;
    }).error(function (err) {
      console.log(err);
    });


    $scope.newPoll = function () {

      $state.go('polls.new');
      // if ($scope.isLoggedIn) {
      //   var modalInstance = $modal.open({
      //       templateUrl: "app/polls/new/new-form.html",
      //       controller: "NewPollCtrl"
      //   });

      //   return modalInstance.result.then(function () {
            
      //   });
      // } else {
      //   $state.go('login');
      // }


    }

        
    

  });
