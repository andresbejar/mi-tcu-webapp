'use strict';

angular.module('miTcuApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
  });
