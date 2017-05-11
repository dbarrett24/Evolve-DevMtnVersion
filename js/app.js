angular.module('app', ['ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('me/overview', {
                url: '/me/overview',
                templateUrl: '../views/me_overview.html'
            })
            .state('me/habits', {
                url: '/me/habits',
                templateUrl: '../views/me_habits.html'
                // controller: 'habitsCtrl'
            })

            $urlRouterProvider.otherwise('/me/overview');
    });

