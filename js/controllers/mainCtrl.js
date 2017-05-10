angular.module('app').controller('mainCtrl', function($scope, mainService, $location, $timeout){
    $scope.test = mainService.test;

	console.log($location);
	$scope.location = $location.$$url;

		//get All Habits
		$scope.getHabits = mainService.getHabits().then(function (habits) {
			$scope.habits = habits;
		})


		//Add new habit
		$scope.newHabit = function (newhabit, newHabitFrequency) {
			$timeout(function () {
				console.log("Form-data before sent to service", newhabit);
				mainService.newHabit(newhabit, newHabitFrequency).then(function(response){
					mainService.getHabits().then(function(habits){
						$scope.habits = habits;
						console.log("After getHabits() comes back", $scope.habits);
					});
				});
			}, 150)
		}
		//Edit a Habit
		$scope.editHabit = function (habit, HabitFrequency) {
			$timeout(function () {
				console.log("Form-data before sent to service", habit);
				mainService.editHabit(habit, HabitFrequency).then(function(response){
					mainService.getHabits().then(function(habits){
						$scope.habits = habits;
						console.log("After getHabits() comes back with edits", $scope.habits);
					});
				});
			}, 150)
		}

		//Populate edit Modal with selected Habit's data
		$scope.editModal = function(habit){
			console.log(habit);
			$scope.title = habit.title;
			$scope.reminder_time = habit.reminder_time;
			$scope.monday = habit.monday;
			$scope.tuesday = habit.tuesday;
			$scope.wednesday = habit.wednesday;
			$scope.thursday = habit.thursday;
			$scope.friday = habit.friday;
			$scope.saturday = habit.saturday;
			$scope.sunday = habit.sunday;
			$scope.color = habit.color;
			$scope.date_created = habit.date_created;
			$scope.time_created = habit.time_created;
		}

});