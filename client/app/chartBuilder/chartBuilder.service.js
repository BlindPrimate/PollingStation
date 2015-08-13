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

    // lightens/shades target color
    function lightenDarkenColor(col,amt) {
        var usePound = false;
        if ( col[0] == "#" ) {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col,16);

        var r = (num >> 16) + amt;

        if ( r > 255 ) r = 255;
        else if  (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if ( b > 255 ) b = 255;
        else if  (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if ( g > 255 ) g = 255;
        else if  ( g < 0 ) g = 0;

        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }


    // Public API here
    return {
      barChart: function (pollData) {
        var basicData = dataFormat(pollData);
        return {
          labels: basicData.labels,
          datasets: [{
            label: pollData.question,
            fillColor: 'rgba(0,121,255,0.1)',
            strokeColor: 'rgba(0,61,130,0.1)',
            highlightFill: 'rgba(54,137,255,0.2)',
            highlightStroke: 'rgba(64,157,255,0.3)',
            data: basicData.votes
          }]
        }
      },
      doughnutChart: function (pollData) {
        var basicData = dataFormat(pollData);
        var doughnutChartData = []; 
        for (var i = 0; i < basicData.labels.length; i++) {
          var randCol = randomColor();
          var highlight = lightenDarkenColor(randCol, 30);
          doughnutChartData.push({
            value: basicData.votes[i],
            // color: "#ffffff",
            color: randCol,
            // highlight: "#000000",
            highlight: highlight,
            label: basicData.labels[i]
          });
        }
        return doughnutChartData;
      },
      barChartOptions: function () {
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
      },
      doughnutChartOptions: function () {
        return {

          responsive : true,
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke : true,

          //String - The colour of each segment stroke
          segmentStrokeColor : "#fff",

          //Number - The width of each segment stroke
          segmentStrokeWidth : 2,

          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout : 70, // This is 0 for Pie charts

          //Number - Amount of animation steps
          animationSteps : 80,

          //String - Animation easing effect
          animationEasing : "easeOutSine",

          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate : true,

          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale : false,

          //String - A legend template
          legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

        }
      }
    };
  });
