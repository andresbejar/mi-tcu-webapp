'use strict';

var app = angular.module('miTcuApp');

app.controller('ProyectoCtrl', function($scope, $routeParams, $http, Comentario, $rootScope){

	$scope.proyectoId = $routeParams.id;
	$scope.comentarios = Comentario.getComments({id: $scope.proyectoId});
	$scope.user = $rootScope.currentUser;
	
	var init = function(){
		//se revisa el tcu matriculado
		if($scope.user.tcuMatriculado === $scope.proyectoId){
			$scope.matriculado = true;
		}

		//se revisa si sigue este proyecto
		$http.get('/api/users/follows/' + $scope.user._id).then(function(res){
			if(res.status === 200){
				var proyectos = res.data;
				for(var i = 0; i < proyectos.length; i++){
					if(proyectos[i]._id === $scope.proyectoId){
						$scope.followed = true;
						break;
					}
				}
			}
		}, function(err){
			$scope.message = err;
		});

		//se carga la info de este proyecto
		$http.get('/api/proyectos/' + $scope.proyectoId).then(function(res){
			if(res.status === 200){
				$scope.proyecto = res.data;
			}
		}, function(err){
			$scope.message = err;
		});
	};

	$scope.checkFollow = function(){
		console.log($scope.user);
		if($scope.user.follows.indexOf($scope.proyectoId) !== -1){
			return true;
		}
		else{
			return false;
		}
	};

	$scope.submitComment = function(form){
		if(form.$valid){
			//falta chequear por XSS!
			var newComment = {
				'autor': $scope.user.name,
				'autorId': $scope.user._id,
				'proyectoId': $scope.proyectoId,
				'contenido': $scope.comment
			};
			Comentario.addComment(newComment).$promise.then(function(data){
				$scope.comentarios.push(data);
				$scope.comment = '';
			}).catch(function(){
				$scope.message = 'Error al enviar el comentario';
			});
		}

	};


	$scope.borrarComment = function(id, index){
		Comentario.deleteComment({'id': id}).$promise.then(function(){
			if(index >= 0 && index < $scope.comentarios.length){
				$scope.comentarios.splice(index, 1);
			}
		}).catch(function(){
			$scope.message = 'Error al borrar el comentario';
		});
	};

	$scope.follow = function(){
		
	};


	$scope.toggleMatricula = function(){
		if($scope.matriculado){
			$http.delete('/api/users/tcu').then(function(res){
				if(res.status===200){
					$scope.matriculado = false;
				}
			})
			.catch(function(err){
				$scope.message = err;
				console.log(err);
			});
		}
		else{
			$http.put('/api/users/tcu', {'id': $scope.user._id, 'tcuId': $scope.proyectoId })
			.then(function(res){
				if(res.status===200){
					$scope.matriculado = true;
				}
			})
			.catch(function(err){
				$scope.message = err;
			});
		}
	};

	$scope.toggleFollow = function(){
		if($scope.followed){
			$http.delete('/api/users/follows/' + $scope.proyectoId).then(function(res){
				if(res.status === 200){
					$scope.followed = false;
				}
			})
			.catch(function(err){
				$scope.message = err;
			});
		}
		else{
			$http.put('/api/users/proyecto', {'id': $scope.user._id, 'proyectoId': $scope.proyectoId})
			.then(function(res){
				if(res.status===200){
					console.log('project followed');
					$scope.followed = true;
				}
				//algo
			})
			.catch(function(err){
				$scope.message = err;
			});
		}
	};

	init();

});

