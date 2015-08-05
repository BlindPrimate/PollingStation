'use strict';

angular.module('votingAppApp')
  .factory('pollFactory', function ($http) {
    // Service logic
    // ...
    var api_url = '/api/polls/';

    // Public API here
    return {
      getPolls: function () {
        return $http.get(api_url);
      },
      getPoll: function (poll_id) {
        return $http.get(api_url + poll_id);
      },
      changeVote: function (poll_id, option_index) {
        $http.get(api_url + poll_id).success(function (poll) {
          poll.options[option_index].votes += 1;
          $http.put(api_url + poll_id, poll);
        });
      }

    }
  });
