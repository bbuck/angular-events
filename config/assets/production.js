'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/foundation/css/normalize.css',
        'public/lib/foundation/css/foundation.min.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/foundation/js/foundation.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-foundation/mm-foundation.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-file-upload/angular-file-upload.js'
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  }
};
