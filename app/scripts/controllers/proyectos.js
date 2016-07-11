'use strict';

angular.module('miTcuApp').controller('ProyectosCtrl', function ($scope, $http) {

    $http.get('/api/proyectos').success(function(proyectos) {
      console.log(proyectos);
      $scope.proyectos = proyectos;
    });

  });
  // 'use strict';
  // var app = angular.module('miTcuApp');
  //
  // app.controller('ProyectosCtrl', function ($scope, $http) {
  //
  //   $scope.proyectos = []
  //   $http.get('/api/proyectos').then(function(res){
  //     if(res.status === 200){
  //       $scope.proyectos = res.data;
  //       $scope.message = 'Success';
  //     }
  //   }).then(function(err){
  //     $scope.message = err;
  //   });
  //
  // });
