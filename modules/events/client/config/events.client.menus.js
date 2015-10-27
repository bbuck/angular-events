'use strict';

angular.module('events').run(['Menus', function(Menus) {
  Menus.addMenuItem('topbar', {
    title: 'Events',
    state: 'events',
    type: 'dropdown',
    url: '/events(/create)?'
  });
  Menus.addSubMenuItem('topbar', 'events', {
    state: 'events',
    title: 'List Events',
    url: 'events'
  });
  Menus.addSubMenuItem('topbar', 'events', {
    state: 'events-create',
    title: 'Create Event',
    url: 'events/create'}
  );
}]);
