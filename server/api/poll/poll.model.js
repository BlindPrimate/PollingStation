'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  author: { 
    name: String,
    user_id: String,
    _id: false
},
  options: [{
    label: String,
    votes: Number,
    _id: false
  }],
  users_voted: [],
  totalVotes: Number
});

module.exports = mongoose.model('Poll', PollSchema);
