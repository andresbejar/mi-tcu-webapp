'use strict';

angular.module('miTcuApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
