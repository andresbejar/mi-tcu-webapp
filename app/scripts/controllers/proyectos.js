'use strict';

var app = angular.module('miTcuApp');

app.controller('ProyectosCtrl', function($scope, $routeParams, $http){

  $scope.proyectoArea = $routeParams.area;
  $http.get('/api/area?area=' + $scope.proyectoArea).then(function(res){
    if(res.status === 200){
      $scope.proyectos = res.data;
    }
  }, function(err){
    $scope.message = err;
  });
});
