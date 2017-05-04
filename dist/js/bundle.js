'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('me/overview', {
        url: '/me/overview',
        templateUrl: '../views/me_overview.html'
    }).state('me/habits', {
        url: '/me/habits',
        templateUrl: '../views/me_habits.html'
    });

    $urlRouterProvider.otherwise('/me/overview');
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mainService, $location) {
	$scope.test = mainService.test;

	console.log($location);
	$scope.location = $location.$$url;
});
'use strict';

angular.module('app').service('mainService', function ($http) {
    // *****************************
    this.test = "Controller & Service are working";
    // *****************************
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

angular.module('app').directive('colorPicker', function () {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/widgets/colorPicker.html',
        link: function link(scope, elem, attrs) {
            $(document).ready(function () {
                var colorButton = $(".color-choices li");
                colorButton.on("click", function () {
                    // Remove class from currently active button
                    $(".color-choices > li").removeClass("active-color");
                    // Add class active to clicked button
                    $(this).addClass("active-color");
                    // Get background color of clicked
                    var newColor = $(this).attr("data-color");
                    // Change background of everything with class .bg-color
                    $(".bg-color").css("background-color", newColor);
                    // Change color of everything with class .text-color
                    $(".text-color").css("color", newColor);
                });
            });
        }
    };
});
'use strict';

angular.module('app').directive('timePicker', function () {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/widgets/timePicker.html',
        scope: {
            timePickerTitle: '@'
        },
        link: function link(scope, elem, attrs) {
            $(document).ready(function () {
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
            });
        }
    };
});
//# sourceMappingURL=bundle.js.map
