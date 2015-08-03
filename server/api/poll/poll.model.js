'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  option: [{
    label: String,
    votes: Number
  }]
});

module.exports = mongoose.model('Poll', PollSchema);
