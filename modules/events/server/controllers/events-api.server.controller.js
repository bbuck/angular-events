'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    EventModel = mongoose.model('Event'),
    VALID_PROPS = ['title', 'start', 'end', 'category', 'description', 'featured'];

function getEventParams(request) {
  var retProps = {},
      i, prop;

  for (i = 0; i < VALID_PROPS.length; ++i) {
    prop = VALID_PROPS[i];
    if (request.body[prop]) {
      retProps[prop] = request.body[prop];
    }
  }

  return retProps;
}

module.exports.fetchEvent = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Event is invalid.'
    });
  }

  EventModel.findById(id, '-__v', function(err, event) {
    if (err) {
      next(err);
    } else if (!event) {
      next(new Error('Failed to load event ' + id));
    } else {
      req.event = event;
      next();
    }
  });
};

module.exports.list = function(req, res) {
  var events = EventModel.find({}, '-__v', function(err, events) {
    if (err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.send(events || []);
    }
  });
};

module.exports.create = function(req, res) {
  var eventProps = getEventParams(req),
      event = new EventModel(eventProps);

  event.save(function(err) {
    if (err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.event);
};

module.exports.update = function(req, res) {
  var eventProps = getEventParams(req),
      prop, value;

  for (prop in eventProps) {
    value = eventProps[prop];
    req.event[prop] = value;
  }

  req.event.save(function(err) {
    if (err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err) || err.message
      });
    } else {
      res.json(req.event);
    }
  });
};

module.exports.delete = function(req, res) {
  EventModel.remove({_id: req.event._id}, function(err) {
    if (err) {
      res.status(500).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.send({success: true});
    }
  });
};
