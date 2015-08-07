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
      getUserPolls: function (user_id) {
        return $http.get(api_url + 'user/' + user_id);
      },
      getPoll: function (poll_id) {
        return $http.get(api_url + poll_id);
      },
      submitVote: function (poll_id, option_index, voting_user) {
        return $http.get(api_url + poll_id).success(function (poll) {
          poll.options[option_index].votes += 1;
          poll.users_voted.push(voting_user);
          return $http.put(api_url + poll_id, poll);
        });
      },
      submitPoll: function (poll) {
        return $http.post(api_url, poll);
      },
      deletePoll: function (poll) {
        return $http.delete(api_url + poll);
      }
    }
  });
