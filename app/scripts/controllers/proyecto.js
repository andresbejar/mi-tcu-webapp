'use strict';

var app = angular.module('miTcuApp');

app.controller('ProyectoCtrl', function($scope, $routeParams, $http){

	$scope.proyectoId = $routeParams.id;
	$http.get('/api/proyecto/' + $scope.proyectoId).then(function(res){
		if(res.status === 200){
			$scope.proyecto = res.data;
		}
	}, function(err){
		$scope.message = err;
	});

});
