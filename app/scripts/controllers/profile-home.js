'use strict';

var app = angular.module('miTcuApp');

app.controller('ProfileHomeCtrl', ['$scope', 'Auth', function(){
	

	$scope.user = Auth.currentUser;
}]);