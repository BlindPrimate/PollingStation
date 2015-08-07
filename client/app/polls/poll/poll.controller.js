'use strict';

angular.module('votingAppApp')
  .controller('PollCtrl', function ($scope, $stateParams, $http, Auth, pollFactory) {
    
    var currUsrId = Auth.getCurrentUser()._id;
    $scope.pollTaken = false;

    function buildChart(pollData) {
        var labels = [],
            votes = [];
        for (var i in pollData.options) {
            labels.push(pollData.options[i].label);
            votes.push(pollData.options[i].votes);
        }

        $scope.pollResults = {
            labels: labels,
            datasets: [
            {
              label: pollData.question,
              fillColor: 'rgba(220,220,220,0.5)',
              strokeColor: 'rgba(220,220,220,0.8)',
              highlightFill: 'rgba(220,220,220,0.75)',
              highlightStroke: 'rgba(220,220,220,1)',
              data: votes
            }
            ]
        };
    }



    pollFactory.getPoll($stateParams.id).success(function (data) {
        $scope.poll = data;
        console.log(currUsrId, data.users_voted);  
        if (data.users_voted.indexOf(currUsrId) !== -1) {
          $scope.pollTaken = true;
        } else {
          $scope.pollTaken = false;
        }   
        buildChart(data);      
    });



    $scope.currChoice = '';


    $scope.chartOptions = {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero : true,

      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - If there is a stroke on each bar
      barShowStroke : true,

      //Number - Pixel width of the bar stroke
      barStrokeWidth : 2,

      //Number - Spacing between each of the X value sets
      barValueSpacing : 5,

      //Number - Spacing between data sets within X values
      barDatasetSpacing : 1,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    
    $scope.submitVote = function (choice) {
      pollFactory.submitVote($stateParams.id, choice, Auth.getCurrentUser()._id).success(function (updatedPoll) {
        console.log(updatedPoll);
        $scope.poll = updatedPoll;
        buildChart(updatedPoll);
        $scope.pollTaken = true;
      });
    }



  });
