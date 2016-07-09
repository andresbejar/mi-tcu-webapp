'use strict';

var app = angular.module('miTcuApp');

app.controller('ProfileHomeCtrl', ['$scope', 'Auth', '$http', function($scope, Auth, $http){
	

	$scope.user = Auth.currentUser();
	$scope.editable = false;
	$scope.proyecto = {};

	$http.get('/api/users/proyecto/:id', {
		params: {'id': $scope.user._id }
	}).then(function(res){
		if(res.status === 200){
			$scope.proyecto = res.data;
		}
	}, function(err){
		$scope.proyecto = err;
	});

	$scope.save = function(form){
		$scope.submitted = true;

		if(form.$valid){
			Auth.update({
				email: $scope.user.email,
				about: $scope.user.personalInfo.about,
				carrera: $scope.user.personalInfo.carrera,
				edad: $scope.user.personalInfo.edad,
				tcuMatriculado: $scope.user.tcuMatriculado
			}).then(function(){
				$scope.message = 'Informacion actualizada';
				$scope.editable = false;
				angular.element('input').prop('readonly', true);
			}).catch(function(){
				$scope.message = 'Error al actualizar la informacion';
			});
		}

	};

	$scope.editar = function(){
		$scope.editable = true;
		angular.element('input').prop('readonly', false);
	};

	$scope.desmatricular = function(){
		if($scope.editable){
			$scope.user.tcuMatriculado = '';
		}
	};
}]);