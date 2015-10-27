'use strict';

angular.module('events').controller('EventListController', ['$scope', '$location', 'Events',
  function($scope, $location, Events) {
    $scope.dateFormat = 'MMMM dd, yyyy';
    $scope.timeFormat = 'hh:mm a';

    $scope.isStarted = function(time) {
      var now = new Date(),
          testDate = new Date(time);

      return now >= testDate;
    };

    $scope.isEnded = function(time) {
      var now = new Date(),
          testDate = new Date(time);

      return now >= testDate;
    };

    $scope.delete = function(event) {
      if (confirm('Are you sure you wish to delete the event "' + event.title + '?"')) {
        event.$delete(
          function(res) {
            var index = $scope.events.indexOf(event);
            $scope.events.splice(index, 1);
          },
          function(err) {
            alert('Failure to delete the record:\n' + err.data.message);
          }
        );
      }
    };

    $scope.find = function() {
      $scope.events = Events.query();
    };
  }
]);

angular.module('events').controller('CreateEventController', ['$scope', '$location', 'Events',
  function($scope, $location, Events) {
    $scope.save = function() {
      this.submitting = true;

      var event = new Events({
        title: this.title,
        category: this.category,
        description: this.description,
        start: this.start,
        end: this.end,
        featured: this.featured
      });

      event.$save(
        function(response) {
          $scope.success = true;
          $scope.error = false;

          $scope.title = '';
          $scope.start = '';
          $scope.end = '';
          $scope.category = '';
          $scope.description = '';

          $scope.submitting = false;
        },
        function(err) {
          $scope.error = err.data.message;
          $scope.success = true;

          $scope.submitting = false;
        }
      );
    };
  }
]);

angular.module('events').controller('EditEventController', ['$scope', '$filter', 'Events', 'eventResolve',
  function($scope, $filter, Events, eventResolve) {
    $scope.event = eventResolve;

    $scope.save = function() {
      $scope.event.$update(
        function(res) {
          $scope.success = true;
          $scope.error = false;
        },
        function(err) {
          $scope.success = false;
          $scope.error = err.data.message;
        }
      );
    };
  }
]);
