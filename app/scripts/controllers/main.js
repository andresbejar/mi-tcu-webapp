'use strict';

angular.module('miTcuApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/proyectos').success(function(proyectos) {
      $scope.proyectos = proyectos;
    });
    
  });
