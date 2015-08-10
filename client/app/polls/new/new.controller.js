angular.module('votingAppApp')
  .controller('NewPollCtrl', function ($scope, $http, Auth, $location, pollFactory) {
    
    $scope.samplePoll = {
      question: "Who was the best James Bond?",
      options: ["Sean Connery", "Daniel Craig", "Pierce Brosnan", "Roger Moore"]
    }

    $scope.poll = {
      question: "",
      author: {
        name: Auth.getCurrentUser().name,
        user_id: Auth.getCurrentUser()._id
      },
      options: [
        {
          label: "",
          votes: 0
        }, {
          label: "",
          votes: 0
        }, {
          label: "",
          votes: 0
        }, {
          label: "",
          votes: 0
        }
      ],
      totalVotes: 0   
    };


    $scope.removeOption = function(index) {
      $scope.poll.options.splice(index, 1);
    };

    $scope.addOption = function () {
      $scope.poll.options.push({
        label: "",
        votes: 0
      });
    };

    $scope.submit = function() {
      pollFactory.submitPoll($scope.poll).success(function (submittedPoll) {
        $location.path('/polls/' + submittedPoll._id);
      });
    };
  });
