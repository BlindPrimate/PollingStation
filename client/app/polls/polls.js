'use strict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls', {
        url: '/polls',
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl'
      })
      .state('polls/:id', {
        url: '/polls/:id',
        templateUrl: 'app/polls/poll/poll.html',
        controller: 'PollCtrl'
      });
  });
