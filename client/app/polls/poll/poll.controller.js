'use strict';

angular.module('votingAppApp')
  .controller('PollCtrl', function ($scope, $stateParams, $http, pollFactory) {

    function buildChart(pollData) {
        var labels = [],
            votes = [];
        for (var i in pollData.options) {
            labels.push(pollData.options[i].label);
            votes.push(pollData.options[i].votes);
        }
        return {title: pollData.question, labels: labels, votes: votes};
    }


    pollFactory.getPoll($stateParams.id).success(function (data) {
        $scope.poll = data;
        var chartData = buildChart(data);

        $scope.pollResults = {
            labels: chartData.labels,
            datasets: [
            {
              label: chartData.question,
              fillColor: 'rgba(220,220,220,0.5)',
              strokeColor: 'rgba(220,220,220,0.8)',
              highlightFill: 'rgba(220,220,220,0.75)',
              highlightStroke: 'rgba(220,220,220,1)',
              data: chartData.votes
            }
            ]
        };
    }).error(function (err) {
        console.log(err);
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
      pollFactory.changeVote($stateParams.id, choice);
    }



  });
