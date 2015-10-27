'use strict';

module.exports = function(app) {
  var eventsApi = require('../controllers/events-api.server.controller.js');

  app.route('/api/events')
    .get(eventsApi.list)
    .post(eventsApi.create);

  app.route('/api/events/:eventId')
    .get(eventsApi.read)
    .put(eventsApi.update)
    .patch(eventsApi.update)
    .delete(eventsApi.delete);

  app.param('eventId', eventsApi.fetchEvent);
};
