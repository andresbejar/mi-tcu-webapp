'use strict';

var app = angular.module('miTcuApp');

app.controller('UserActivityCtrl', function($scope, $http){

	$scope.follows = [];
	console.log('$scope.user._id: ' + $scope.user.email);
	$http.get('/api/users/follows/' + $scope.user._id).then(function(res){
		if(res.status === 200){
			$scope.follows = res.data;
			$scope.message = 'Success';
		}
	}).then(function(err){
		$scope.message = err;
	});

	$scope.placeholder = 'Hello world!';
});