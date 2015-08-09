'use strict';

angular.module('votingAppApp')
  .controller('PollCtrl', function ($scope, $stateParams, $http, Auth, pollFactory, chartBuilder) {
    
    var currUsrId = Auth.getCurrentUser()._id;
    $scope.pollTaken = false;
    $scope.isLoggedIn = Auth.isLoggedIn;


    function buildCharts(chartData) {
      $scope.barChartData = chartBuilder.barChart(chartData);
      $scope.doughnutChartData = chartBuilder.doughnutChart(chartData);
      $scope.barChartOptions = chartBuilder.barChartOptions();
      $scope.doughnutChartOptions = chartBuilder.doughnutChartOptions();
    }


    // retrieve poll results
    pollFactory.getPoll($stateParams.id).success(function (data) {
        $scope.poll = data;
        if (data.users_voted.indexOf(currUsrId) !== -1) {
          $scope.pollTaken = true;
        } else {
          $scope.pollTaken = false;
        }   
        buildCharts(data);      
    });


    $scope.currChoice = '';

    $scope.submitVote = function (choice) {
      pollFactory.submitVote($stateParams.id, choice, Auth.getCurrentUser()._id).success(function (updatedPoll) {
        $scope.poll = updatedPoll;
        buildCharts(updatedPoll);
        $scope.pollTaken = true;
      });
    }



  });
