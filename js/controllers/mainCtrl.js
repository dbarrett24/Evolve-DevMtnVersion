angular.module('app').controller('mainCtrl', function($scope, mainService, $location, $timeout){
    $scope.test = mainService.test;

	console.log($location);
	$scope.location = $location.$$url;

		$scope.getHabits = mainService.getHabits().then(function (habits) {
			$scope.habits = habits;
		})

		$scope.newHabit = function (newhabit, newHabitFrequency) {
			$timeout(function () {
				console.log("Form-data before sent to service", newhabit);
				mainService.newHabit(newhabit, newHabitFrequency).then(function(response){
					mainService.getHabits().then(function(habits){
						$scope.habits = habits;
						console.log("After getHabits() comes back", $scope.habits);
					});
				});
			}, 250)
		}
	

});