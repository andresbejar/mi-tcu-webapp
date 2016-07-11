'use strict';

var app = angular.module('miTcuApp');

app.controller('ProyectosCtrl', function($scope, $routeParams, $http){

  $scope.proyectoArea = $routeParams.area;
  //Paginado
  $scope.viewby = 10;
  $scope.totalItems = 0;
  $scope.currentPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5; //Number of pager buttons to show
  //--------------------

  $http.get('/api/area?area=' + $scope.proyectoArea).then(function(res){
    if(res.status === 200){
      $scope.proyectos = res.data;
      //Paginado
      $scope.totalItems = $scope.proyectos.length;
      //--------------------
    }
  }, function(err){
    $scope.message = err;
  });

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first paghe
  }
});
