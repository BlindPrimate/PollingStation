angular.module('votingAppApp')
  .controller('NewPollCtrl', function ($scope, $http, Auth) {
    $scope.poll = {
      question: "Who was the best James Bond?",
      author: Auth.getCurrentUser().name,
      options: [
        {
          label: "Sean Connery",
          votes: 0
        }, {
          label: "Daniel Craig",
          votes: 0
        }, {
          label: "Roger Moore",
          votes: 0
        }
      ]
    };

    console.log($scope);




    $scope.removeOption = function(index) {
      $scope.poll.options.splice(index, 1);
    };

    $scope.addOption = function () {
      $scope.poll.options.push({
        label: "Option",
        votes: 0
      });
    };

    $scope.submit = function() {
      $http.post('/api/polls', $scope.poll).success(function () {
        console.log('success');
      });
    }
  });
