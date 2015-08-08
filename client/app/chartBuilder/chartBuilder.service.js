'use strict';

angular.module('votingAppApp')
  .factory('chartBuilder', function () {
    // Service logic
    // ...


    // random color generator
    function randomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // general chart data formatting
    function dataFormat(pollData) {
      var labels = [],
          votes = [];
      for (var i in pollData.options) {
          labels.push(pollData.options[i].label);
          votes.push(pollData.options[i].votes);
      }
      return {labels: labels, votes: votes};  
    }


    // Public API here
    return {
      barChart: function (pollData) {
        var basicData = dataFormat(pollData);
        return {
          labels: basicData.labels,
          datasets: [{
            label: pollData.question,
            fillColor: 'rgba(220,220,220,0.5)',
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data: basicData.votes
          }]
        }
      },
      doughnutChart: function (pollData) {
        var basicData = dataFormat(pollData);
        var doughnutChartData = []; 
        //var colors = ["#F7464A", "#46BFBD", "#FDB45C" ];
        //var highlights = ["#FF5A5E", "#5AD3D1", "#FFC870"];
        for (var i = 0; i < basicData.labels.length; i++) {
          doughnutChartData.push({
            value: basicData.votes[i],
            color: randomColor(),
            highlight: "#000000",
            label: basicData.labels[i]
          });
        }
        return doughnutChartData;
      },
      chartOptions: function () {
        return {

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
        }
      }
    };
  });
