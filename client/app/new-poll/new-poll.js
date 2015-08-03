'use strict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new-poll', {
        url: '/new-poll',
        templateUrl: 'app/new-poll/new-poll.html',
        controller: 'NewPollCtrl'
      });
  });