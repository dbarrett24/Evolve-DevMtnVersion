'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('me/overview', {
        url: '/me/overview',
        templateUrl: '../views/me_overview.html'
    }).state('me/habits', {
        url: '/me/habits',
        templateUrl: '../views/me_habits.html'
        // controller: 'habitsCtrl'
    });

    $urlRouterProvider.otherwise('/me/overview');
});
'use strict';

angular.module('app').controller('habitsCtrl', function ($scope, mainService) {
    $scope.test = mainService.test;
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mainService, $location, $timeout) {
	$scope.test = mainService.test;

	console.log($location);
	$scope.location = $location.$$url;

	//get All Habits
	$scope.getHabits = mainService.getHabits().then(function (habits) {
		$scope.habits = habits;
	});

	//Add new habit
	$scope.newHabit = function (newhabit, newHabitFrequency) {
		$timeout(function () {
			console.log("Form-data before sent to service", newhabit);
			mainService.newHabit(newhabit, newHabitFrequency).then(function (response) {
				mainService.getHabits().then(function (habits) {
					$scope.habits = habits;
					console.log("After getHabits() comes back", $scope.habits);
				});
			});
		}, 150);
	};
	//Edit a Habit
	$scope.editHabit = function (habit, HabitFrequency) {
		$timeout(function () {
			console.log("Form-data before sent to service", habit);
			mainService.editHabit(habit, HabitFrequency).then(function (response) {
				mainService.getHabits().then(function (habits) {
					$scope.habits = habits;
					console.log("After getHabits() comes back with edits", $scope.habits);
				});
			});
		}, 150);
	};

	//Populate edit Modal with selected Habit's data
	$scope.editModal = function (habit) {
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
	};
});
'use strict';

angular.module('app').service('mainService', function ($http) {
    var self = this;
    // *****************************
    this.test = "Controller & Service are working";

    this.reminderTime = "8:00 PM";
    this.selectedColor = "blue";
    this.date = new Date();
    // *****************************

    this.getHabits = function () {
        return $http({
            method: 'GET',
            url: '/api/getHabits'
        }).then(function (response) {
            // console.log(response.data);
            return response.data;
        });
    };

    this.newHabit = function (newHabit, newHabitFrequency) {
        newHabit.color = this.selectedColor;
        newHabit.reminder_time = this.reminderTime;
        newHabit.date_created = this.date.toLocaleDateString();
        newHabit.time_created = this.date.toLocaleTimeString();

        // console.log(newHabit, newHabitFrequency);

        return $http({
            method: 'POST',
            url: '/api/createHabit',
            data: { newHabit: newHabit, newHabitFrequency: newHabitFrequency }
        }).then(function (response) {
            // console.log(response);
            // self.getHabits();
            return response;
        });
    };

    this.editHabit = function (Habit, HabitFrequency) {
        // Habit.color = this.editedColor;
        // Habit.reminder_time = this.reminderTime;
        // Habit.date_created = this.date.toLocaleDateString();
        // Habit.time_created = this.date.toLocaleTimeString();

        console.log(newHabit, newHabitFrequency);

        return $http({
            method: 'PUT',
            url: '/api/editHabit',
            data: { Habit: Habit, HabitFrequency: HabitFrequency }
        }).then(function (response) {
            // console.log(response);
            // self.getHabits();
            return response;
        });
    };
});
'use strict';

angular.module('app').directive('editHabitModal', function () {
    return {
        restrict: "AE",
        templateUrl: '../views/directives/habits/editHabitModal.html'
    };
});
'use strict';

angular.module('app').directive('habitCreatorDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/habits/habitCreatorDir.html'
    };
});
'use strict';

angular.module('app').directive('newHabitModal', function () {
    return {
        restrict: "AE",
        templateUrl: '../views/directives/habits/newHabitModal.html'
    };
});
'use strict';

angular.module('app').directive('footerDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/templates/footerDir.html'
    };
});
'use strict';

angular.module('app').directive('sidebarDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/templates/sidebarDir.html'
    };
});
'use strict';

angular.module('app').directive('topNavDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/templates/topNavDir.html'
    };
});
'use strict';

angular.module('app').directive('colorPicker', function (mainService) {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/widgets/colorPicker.html',
        scope: {
            colorValue: "="
        },
        link: function link(scope, elem, attrs) {

            scope.colorSelect = function (color) {
                //assigns data value of selected color to variable in mainService
                mainService.selectedColor = color;
                // mainService.editedColor = color;

                // Remove class from currently active button
                $(".color-choices > li").removeClass("active-color");
                // Add class active to clicked button
                $(this).addClass("active-color");
                // Get background color of clicked
                scope.colorValue = color;
            };
        }
    };
});
'use strict';

angular.module('app').directive('timePicker', function (mainService) {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/widgets/timePicker.html',
        scope: {
            timePickerTitle: '@',
            reminderTime: '='
        },
        link: function link(scope, elem, attrs) {
            $("#commit").on('click', function () {
                // mainService.reminderTime = scope.reminderTime;
                mainService.reminderTime = $('#reminder_time').val();
                // console.log(mainService.reminderTime)
            });
            $("#save").on('click', function () {
                // mainService.reminderTime = scope.reminderTime;
                mainService.reminderTime = $('#reminder_time').val();
                // console.log(mainService.reminderTime)
            });

            $('.timepicker').datetimepicker({
                //          format: 'H:mm',    // use this format if you want the 24hours timepicker
                format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove',
                    inline: true

                }
            });
        },
        controller: function controller($scope, mainService, $interval) {}
    };
});
//# sourceMappingURL=bundle.js.map
