'use strict';

var app = angular.module('miTcuApp');

app.controller('ProfileHomeCtrl', ['$scope', 'Auth', function($scope, Auth){
	

	$scope.user = Auth.currentUser();

	$scope.save = function(){
		Auth.update({
			email: $scope.user.email,
			about: $scope.user.personalInfo.about,
			carrera: $scope.user.personalInfo.carrera,
			edad: $scope.user.personalInfo.edad
		}).then(function(){
			$scope.message = 'Informacion actualizada';
		}).catch(function(){
			$scope.message = 'Error al actualizar la informacion';
		});
	};
}]);