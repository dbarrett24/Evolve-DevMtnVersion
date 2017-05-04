angular.module('app').controller('mainCtrl', function($scope, mainService, $location){
    $scope.test = mainService.test;

	console.log($location);
	$scope.location = $location.$$url;


});