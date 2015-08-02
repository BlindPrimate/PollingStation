'use strict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new', {
        url: '/new',
        templateUrl: 'app/new-poll/new-poll.html',
        controller: 'NewPollCtrl'
      });
  });
