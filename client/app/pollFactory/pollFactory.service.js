'use strict';

angular.module('votingAppApp')
  .factory('pollFactory', function ($http) {
    // Service logic
    // ...
    var api_url = '/api/polls/';

    // Public API here
    return {
      // get all polls in db
      getPolls: function () {
        return $http.get(api_url);
      },
      // get all polls from target user
      getUserPolls: function (user_id) {
        return $http.get(api_url + 'user/' + user_id);
      },
      // get target poll
      getPoll: function (poll_id) {
        return $http.get(api_url + poll_id);
      },
      // change db to reflect user vote -- vote incremented by 1
      submitVote: function (poll_id, option_index, voting_user) {
        return $http.get(api_url + poll_id).success(function (poll) {
          poll.options[option_index].votes += 1;
          poll.users_voted.push(voting_user);
          return $http.put(api_url + poll_id, poll);
        });
      },
      // create new poll and add to db
      submitPoll: function (poll) {
        return $http.post(api_url, poll);
      },
      // delete target poll from db
      deletePoll: function (poll) {
        return $http.delete(api_url + poll);
      }
    }
  });
