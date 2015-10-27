'use strict';

angular.module('events').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('events', {
      url: '/events',
      controller: 'EventListController',
      templateUrl: 'modules/events/views/list.client.view.html'
    })
    .state('events-create', {
      url: '/events/new',
      controller: 'CreateEventController',
      templateUrl: 'modules/events/views/create.client.view.html'
    })
    .state('events-edit', {
      url: '/events/:eventId/edit',
      controller: 'EditEventController',
      templateUrl: 'modules/events/views/edit.client.view.html',
      resolve: {
        eventResolve: ['$stateParams', 'Events', function($stateParams, Events) {
          return Events.get({
            eventId: $stateParams.eventId
          });
        }]
      }
    });
}]);
