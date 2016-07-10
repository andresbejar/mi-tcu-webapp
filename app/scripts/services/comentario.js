'use strict';

angular.module('miTcuApp')
	.factory('Comentario', ['$resource', function($resource){
		return $resource('/api/comentarios/:id', {
			id: '@id'
		}, {
			addComment: {
				method: 'PUT',
				params: {}
			},
			getComments: {
				method: 'GET',
				isArray: true
			},
			deleteComment: {
				method: 'DELETE'
			}
		});
	}]);