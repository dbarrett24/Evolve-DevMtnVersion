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

angular.module('app').controller('mainCtrl', function ($scope, mainService) {
				$scope.test = mainService.test;
});
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
'use strict';

angular.module('app').directive('footerDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/footerDir.html'
    };
});
'use strict';

angular.module('app').directive('habitCreatorDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/habitCreatorDir.html'
    };
});
'use strict';

angular.module('app').directive('newHabitModal', function () {
    return {
        restrict: "AE",
        templateUrl: '../views/directives/newHabitModal.html'
    };
});
'use strict';

angular.module('app').directive('sidebarDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/sidebarDir.html'
    };
});
'use strict';

angular.module('app').directive('topNavDir', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/topNavDir.html'
    };
});
'use strict';

angular.module('app').service('mainService', function ($http) {
    // *****************************
    this.test = "Controller & Service are working";
    // *****************************
});
//# sourceMappingURL=bundle.js.map
