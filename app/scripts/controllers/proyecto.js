'use strict';

var app = angular.module('miTcuApp');

app.controller('ProyectoCtrl', function($scope, $routeParams, $http, Comentario, Auth){

	$scope.proyectoId = $routeParams.id;
	$scope.comentarios = Comentario.getComments({id: $scope.proyectoId});
	$scope.user = Auth.currentUser();

	$scope.checkFollow = function(){
		console.log($scope.user);
		if($scope.user.follows.indexOf($scope.proyectoId) !== -1){
			return true;
		}
		else{
			return false;
		}
	};

	$http.get('/api/proyectos/' + $scope.proyectoId).then(function(res){
		if(res.status === 200){
			$scope.proyecto = res.data;
		}
	}, function(err){
		$scope.message = err;
	});

	$scope.submitComment = function(form){
		if(form.$valid){
			//falta chequear por XSS!
			var newComment = {
				'autor': $scope.user.name,
				'autorId': $scope.user._id,
				'proyectoId': $scope.proyectoId,
				'contenido': $scope.comment
			};
			Comentario.addComment(newComment).$promise.then(function(){
				$scope.updateComments(newComment);
			}).catch(function(){
				$scope.message = 'Error al enviar el comentario';
			});
		}

	};

	$scope.updateComments = function(newComment){
		$scope.comentarios.push({'contenido': newComment.contenido, 'autor': {'nombre': newComment.autor}});
		$scope.comment = '';
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
	};

});

