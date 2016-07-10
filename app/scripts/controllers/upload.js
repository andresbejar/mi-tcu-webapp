'use strict';
var app = angular.module('miTcuApp');

app.controller('UploadCtrl', function($scope, Upload, $window, $rootScope, $location){

	//console.log($rootScope.currentUser._id);
	$scope.submit = function(){ //function to call on form submit
		if($scope.uploadForm.file.$valid && $scope.file) { //check if from is valid
			console.log($scope.file.name);
			$scope.upload($scope.file); //call upload function
		}
	};

	$scope.upload = function (file){
		Upload.upload({
			url: '/api/upload', //webAPI exposed to upload the file
			data:{file:file, id: $rootScope.currentUser._id } //pass file as data, should be user ng-model
		}).then(function (resp) { //upload function returns a promise
			if(resp.data.error_code === 0){ //validate success
				$window.alert('Foto de perfil actualizada');
				$location.url('/profile');
			}
			else {
				$window.alert('an error occured');
			}
		}, function (resp) { //catch error
			console.log('Error status: ' + resp.status);
			$window.alert('Error status: ' + resp.status);
		}, function (evt){
			console.log(evt);
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			$scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
		});
	};

});