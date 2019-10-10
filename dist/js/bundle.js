"use strict";

angular.module('app', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '../views/login.html'
  }).state('me/overview', {
    url: '/me/overview',
    templateUrl: '../views/me_overview.html' // resolve:{
    //     authenticate: function(userService){
    //         // check to see if authenticated
    //     }
    // }

  }).state('me/habits', {
    url: '/me/habits',
    templateUrl: '../views/me_habits.html' // controller: 'habitsCtrl'

  });
  console.log($urlRouterProvider);
  $urlRouterProvider.otherwise('/');
});
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('particles-js', 'assets/particles.json', function() {
// console.log('callback - particles.js config loaded');
// });
"use strict";

angular.module('app').controller('habitsCtrl', function ($scope, mainService) {
  $scope.test = mainService.test;
});
"use strict";

angular.module('app').controller('mainCtrl', function ($scope, mainService, $location, $timeout) {
  $scope.test = mainService.test;
  var value = false;
  $scope.showLoader = value;
  console.log($location);
  $scope.location = $location.$$url; // mainService.getUser().then(function(response){
  // 	$scope.user = response;
  // 	console.log($scope.user);
  // })
  //get All Habits

  $scope.getHabits = function () {
    $timeout(function () {
      mainService.getHabits().then(function (habits) {
        $scope.habits = habits;
        console.log("After getHabits() comes back", $scope.habits);
      });
    }, 0);
  };

  $scope.getHabits(); //Add new habit

  $scope.newHabit = function (newhabit, newHabitFrequency) {
    $scope.showLoader = !value;
    $timeout(function () {
      console.log("Habit Creation Form-data before sent to service", newhabit);
      mainService.newHabit(newhabit, newHabitFrequency).then(function (response) {
        console.log(response.data); // $scope.habits.push(response.data.slice(0, 1));

        $scope.getHabits();
        $scope.showLoader = value;
        swal({
          title: 'Habit Commited!',
          text: 'Don\'t screw it up, bub!',
          type: 'success',
          confirmButtonText: 'Yes, master'
        });
      });
    }, 2000);
  }; //Edit a Habit


  $scope.editHabit = function (editedhabit, editFrequency) {
    $scope.showLoader = !value;
    $timeout(function () {
      console.log("Edited Form-data before sent to service", editedhabit, editFrequency);
      mainService.editHabit(editedhabit, editFrequency).then(function (response) {
        $scope.getHabits();
        $scope.showLoader = value;
        swal({
          title: 'Changes Saved!',
          type: 'success',
          confirmButtonText: 'Nice'
        });
      });
    }, 2000);
  }; //Delete a Habit


  $scope.deleteHabit = function (habitId) {
    $timeout(function () {
      console.log("Deleted Habit Form-data before sent to service", habitId);
      mainService.deleteHabit(habitId).then(function (response) {
        $scope.getHabits();
      });
    }, 150);
  }; //Pulls up modal to verify user's intent to delete habit.


  $scope.deleteVerify = function (deletedHabit) {
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
      });
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal('Cancelled', 'Your habit is safe :)', 'error');
      }
    });
  }; //Populate edit Modal with selected Habit's data


  $scope.editModal = function (habit) {
    $scope.editedHabit = {};
    $scope.editFrequency = {}; //Split to Habit Table attributes

    $scope.editedHabit.title = habit.title;
    $scope.editedHabit.reminder_time = habit.reminder_time;
    $scope.editedHabit.color = habit.color;
    $scope.editedHabit.date_created = habit.date_created;
    $scope.editedHabit.time_created = habit.time_created;
    $scope.editedHabit.currentstreak = habit.currentstreak;
    $scope.editedHabit.id = habit.id; //Split to Frequency Table attributes

    $scope.editFrequency.monday = habit.monday;
    $scope.editFrequency.tuesday = habit.tuesday;
    $scope.editFrequency.wednesday = habit.wednesday;
    $scope.editFrequency.thursday = habit.thursday;
    $scope.editFrequency.friday = habit.friday;
    $scope.editFrequency.saturday = habit.saturday;
    $scope.editFrequency.sunday = habit.sunday;
    $scope.editFrequency.habit_id = habit.habit_id;
  };

  $scope.checkIn = function (currentStreak) {
    $scope.editedHabit.currentstreak = currentStreak;
    $scope.editedHabit.currentstreak++;
  };
});
"use strict";

angular.module('app').service('mainService', function ($http) {
  var self = this; // *****************************

  this.test = "Controller & Service are working";
  this.reminderTime = "8:00 PM";
  this.selectedColor = "blue";
  this.date = new Date(); // *****************************

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
    newHabit.time_created = this.date.toLocaleTimeString(); // console.log(newHabit, newHabitFrequency);

    return $http({
      method: 'POST',
      url: '/api/createHabit',
      data: {
        newHabit: newHabit,
        newHabitFrequency: newHabitFrequency
      }
    }).then(function (response) {
      // console.log(response);
      // self.getHabits();
      return response;
    });
  };

  this.editHabit = function (editedHabit, editFrequency) {
    console.log(editedHabit, editFrequency);
    return $http({
      method: 'PUT',
      url: '/api/editHabit',
      data: {
        editedHabit: editedHabit,
        editFrequency: editFrequency
      }
    }).then(function (response) {
      return response;
    });
  };

  this.deleteHabit = function (id) {
    // console.log(deletedHabit);
    return $http({
      method: 'DELETE',
      url: '/api/deleteHabit/' + id
    }).then(function (response) {
      return response;
    });
  }; // this.getUser = function(){
  //     return $http({
  //         method: 'GET',
  //         url: '/auth/me'
  //     }).then(function(response){
  //         console.log(response);
  //         return response.data;
  //     })
  // }

});
"use strict";

angular.module('app').directive('footerDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/directives/templates/footerDir.html'
  };
});
"use strict";

angular.module('app').directive('sidebarDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/directives/templates/sidebarDir.html'
  };
});
"use strict";

angular.module('app').directive('topNavDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/directives/templates/topNavDir.html'
  };
});
"use strict";

angular.module('app').directive('editHabitModal', function () {
  return {
    restrict: "AE",
    templateUrl: '../views/directives/habits/editHabitModal.html'
  };
});
"use strict";

angular.module('app').directive('habitCreatorDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/directives/habits/habitCreatorDir.html',
    link: function link(scope, elem, attrs) {// if (document.getElementById('.progress-bar').style.width == "100%"){
      //     $('#habitProgress').addClass('neonGlow')
      // }
    }
  };
});
"use strict";

angular.module('app').directive('newHabitModal', function () {
  return {
    restrict: "AE",
    templateUrl: '../views/directives/habits/newHabitModal.html'
  };
});
"use strict";

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
        mainService.selectedColor = color; // mainService.editedColor = color;
        // Remove class from currently active button

        $(".color-choices > li").removeClass("active-color"); // Add class active to clicked button

        $(this).addClass("active-color"); // Get background color of clicked

        scope.colorValue = color;
      };
    }
  };
});
"use strict";

angular.module('app').directive('eliteLoader', function () {
  return {
    restrict: 'E',
    templateUrl: './views/directives/widgets/eliteLoader.html'
  };
});
"use strict";

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
        mainService.reminderTime = $('#reminder_time').val(); // console.log(mainService.reminderTime)
      });
      $("#save").on('click', function () {
        // mainService.reminderTime = scope.reminderTime;
        mainService.reminderTime = $('#reminder_time').val(); // console.log(mainService.reminderTime)
      });
      $('.timepicker').datetimepicker({
        //          format: 'H:mm',    // use this format if you want the 24hours timepicker
        format: 'h:mm A',
        //use this format if you want the 12hours timpiecker with AM/PM toggle
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
