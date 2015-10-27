'use strict';

var mongoose = require('mongoose'),
    validator = require('validator'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  category: String,
  description: {
    type: String,
    default: 'No description provided.'
  },
  featured: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

EventSchema.pre('save', function(next) {
  if (this.start > this.end) {
    return next(new Error('The start date must occur after the end date!'));
  }

  if (this.isModified()) {
    this.updated = new Date();
  }

  next();
});

mongoose.model('Event', EventSchema);
