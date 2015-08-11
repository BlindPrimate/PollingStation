'use strict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls', {
        url: '/polls',
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl'
      })
      .state('polls.new', {
        url: '/new',
        onEnter: function (Auth, $modal, $state) {

            var modalInstance = $modal.open({
                templateUrl: "app/polls/new/new-form.html",
                controller: "NewPollCtrl",
            });

            modalInstance.result.then(function (submittedPoll) {
                $state.go('polls/:id', {id: submittedPoll._id});
            }, function () {
                $state.go('polls');
            });
        },
        authenticate: true
      });
  })
  .config(function ($stateProvider) {
    $stateProvider
        .state('polls/:id', {
            url: '/polls/:id',
            templateUrl: 'app/polls/poll/poll.html',
            controller: 'PollCtrl'
        })
    });


      