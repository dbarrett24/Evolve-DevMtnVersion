angular.module('app').directive('habitCreatorDir', function(){
    return{
        restrict: 'E',
        templateUrl: './views/directives/habits/habitCreatorDir.html',
        link: function(scope, elem, attrs){

            // if (document.getElementById('.progress-bar').style.width == "100%"){
            //     $('#habitProgress').addClass('neonGlow')
            // }

           
        }
    }
});