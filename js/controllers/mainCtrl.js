angular.module('app').controller('mainCtrl', function($scope, mainService){
    $scope.test = mainService.test;
})