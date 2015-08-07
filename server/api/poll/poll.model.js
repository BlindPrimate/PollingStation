'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  author: String,
  options: [{
    label: String,
    votes: Number,
    _id: false
  }],
  users_voted: []
});

module.exports = mongoose.model('Poll', PollSchema);
