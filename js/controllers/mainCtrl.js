angular.module('app').controller('mainCtrl', function($scope, mainService, $location, $timeout){
    $scope.test = mainService.test;
	var value = false;
	$scope.showLoader = value;
	console.log($location);
	$scope.location = $location.$$url;


		mainService.getUser().then(function(response){
			$scope.user = response;
			console.log($scope.user);
		})

		//get All Habits
		$scope.getHabits = function(){
			$timeout(function(){
				mainService.getHabits().then(function (habits) {
					$scope.habits = habits;
					console.log("After getHabits() comes back", $scope.habits);
				})
			}, 0)
		}
		$scope.getHabits();


		//Add new habit
		$scope.newHabit = function (newhabit, newHabitFrequency) {
			$scope.showLoader = !value;
			$timeout(function () {
				console.log("Habit Creation Form-data before sent to service", newhabit);
				mainService.newHabit(newhabit, newHabitFrequency).then(function(response){
					console.log(response.data);
					// $scope.habits.push(response.data.slice(0, 1));
					$scope.getHabits();
					
					$scope.showLoader = value;
					swal({
						title: 'Habit Commited!',
						text: 'Don\'t screw it up, bub!',
						type: 'success',
						confirmButtonText: 'Yes, master'
					})
				});
			}, 2000)
		}
		//Edit a Habit
		$scope.editHabit = function (editedhabit, editFrequency) {
			$scope.showLoader = !value;
			$timeout(function () {
				console.log("Edited Form-data before sent to service", editedhabit, editFrequency);
				mainService.editHabit(editedhabit, editFrequency).then(function(response){
					$scope.getHabits();
					$scope.showLoader = value;
					swal({
						title: 'Changes Saved!',
						type: 'success',
						confirmButtonText: 'Nice'
					})
				});
			}, 2000)
		}
		//Delete a Habit
		$scope.deleteHabit = function (habitId) {
			$timeout(function () {
				console.log("Deleted Habit Form-data before sent to service", habitId);
				mainService.deleteHabit(habitId).then(function(response){
					$scope.getHabits();
					
				});
			}, 150)
		}
		//Pulls up modal to verify user's intent to delete habit.
		$scope.deleteVerify = function(deletedHabit){
			swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
				cancelButtonText: 'No, cancel!',
				confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
				buttonsStyling: false
			}).then(function () {
				$scope.deleteHabit(deletedHabit);
				swal({
					title: 'Habit Deleted!',
					type: 'success',
					confirmButtonText: 'Phew!'
				})
			}, function (dismiss) {
				// dismiss can be 'cancel', 'overlay',
				// 'close', and 'timer'
				if (dismiss === 'cancel') {
					swal(
						'Cancelled',
						'Your habit is safe :)',
						'error'
					)
				}
			})
		}

		//Populate edit Modal with selected Habit's data
		$scope.editModal = function(habit){
			$scope.editedHabit = {};
			$scope.editFrequency = {};
			//Split to Habit Table attributes
			$scope.editedHabit.title = habit.title;
			$scope.editedHabit.reminder_time = habit.reminder_time;
			$scope.editedHabit.color = habit.color;
			$scope.editedHabit.date_created = habit.date_created;
			$scope.editedHabit.time_created = habit.time_created;
			$scope.editedHabit.currentstreak = habit.currentstreak;
			$scope.editedHabit.id = habit.id;
			//Split to Frequency Table attributes
			$scope.editFrequency.monday = habit.monday;
			$scope.editFrequency.tuesday = habit.tuesday;
			$scope.editFrequency.wednesday = habit.wednesday;
			$scope.editFrequency.thursday = habit.thursday;
			$scope.editFrequency.friday = habit.friday;
			$scope.editFrequency.saturday = habit.saturday;
			$scope.editFrequency.sunday = habit.sunday;
			$scope.editFrequency.habit_id = habit.habit_id;
			
		}

		$scope.checkIn = function(currentStreak){
				$scope.editedHabit.currentstreak = currentStreak
				$scope.editedHabit.currentstreak++;
			 
		}
	
		
});