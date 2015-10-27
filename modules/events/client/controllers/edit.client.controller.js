'use strict';

angular.module('events').controller('EditEventController', ['$scope', 'Events', 'eventResolve',
  function($scope, Events, eventResolve) {
    $scope.event = eventResolve;
  }
]);
