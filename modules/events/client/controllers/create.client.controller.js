'use strict';

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
