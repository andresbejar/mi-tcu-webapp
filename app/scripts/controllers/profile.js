'use strict';

var app = angular.module('miTcuApp');

app.controller('ProfileCtrl', function($scope, Auth){
	$scope.user = Auth.currentUser();
	$scope.active = '/profile';

	$scope.isActive = function(route) {
      return route === $scope.active;
    };


});