'use strict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls/:id', {
        url: '/polls/:id',
        templateUrl: 'app/polls/poll/poll.html',
        controller: 'PollCtrl',
        authenticate: true
      });
  });
