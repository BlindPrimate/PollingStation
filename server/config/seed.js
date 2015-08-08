/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
}); 


Poll.find({}).remove(function () {
  Poll.create({
    question: "Best Programming Lanuage?",
    author: "The Best User",
    options: [{
      label: "Python",
      votes: 31
    }, {
      label: "Javascript",
      votes: 40
    }, {
      label: "C++",
      votes: 12
    }, {
      label: "Java",
      votes: 20 
    }],
  })
});