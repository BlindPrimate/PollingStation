'use strict';

angular.module('votingAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls/new', {
        url: '/polls/new',
        templateUrl: 'app/polls/new/new.html',
        controller: 'NewPollCtrl',
        authenticate: true
      });
  });