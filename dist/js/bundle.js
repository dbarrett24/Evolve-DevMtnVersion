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
