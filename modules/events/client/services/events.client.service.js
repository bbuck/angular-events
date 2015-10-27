'use strict';

var FIELDS = ['start', 'end', 'created', 'updated'];

function transformDate(response) {
  var data = angular.fromJson(response),
      j, flen;

  for (j = 0, flen = FIELDS.length; j < flen; ++j) {
    data[FIELDS[j]] = new Date(Date.parse(data[FIELDS[j]]));
  }

  return data;
}

angular.module('events').factory('Events', ['$resource',
  function($resource) {
    return $resource('api/events/:eventId', {eventId: '@_id'},
      {
        query: {
          transformResponse: function(response) {
            var data = angular.fromJson(response),
                i, len;

            for (i = 0, len = data.length; i < len; ++i) {
              for (j = 0, flen = FIELDS.length; j < flen; ++j) {
                data[i][FIELDS[j]] = new Date(Date.parse(data[i][FIELDS[j]]));
              }
            }

            return data;
          }
        },
        get: {
          transformResponse: transformDate
        },
        update: {
          method: 'PUT',
          transformResponse: transformDate
        }
      }
    );
  }
]);
