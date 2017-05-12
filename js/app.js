angular.module('app', ['ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html'
            })
            .state('me/overview', {
                url: '/me/overview',
                templateUrl: '../views/me_overview.html',
                resolve:{
                    authenticate: function(userService){
                        // check to see if authenticated
                    }
                }
            })
            .state('me/habits', {
                url: '/me/habits',
                templateUrl: '../views/me_habits.html',
                
                // controller: 'habitsCtrl'
            })
            console.log($urlRouterProvider)
            $urlRouterProvider.otherwise('/');
    });



/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

        // particlesJS.load('particles-js', 'assets/particles.json', function() {
        // console.log('callback - particles.js config loaded');
        // });
