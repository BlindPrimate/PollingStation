'use qstrict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls/new', {
        url: '/polls/new',
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl',
        onEnter: function (Auth, $modal, $state) {
          if (Auth.isLoggedIn) {
            var modalInstance = $modal.open({
                templateUrl: "app/polls/new/new-form.html",
                controller: "NewPollCtrl"
            });
            return modalInstance.result.finally(function () {
                $state.go('polls');
            });
          } else {
            $state.go('login');
          }
        }
      });
  });