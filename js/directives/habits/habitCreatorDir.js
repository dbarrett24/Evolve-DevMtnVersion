angular.module('app').directive('habitCreatorDir', function(){
    return{
        restrict: 'E',
        templateUrl: './views/directives/habits/habitCreatorDir.html',
        link: function(scope, elem, attrs){

            if (document.getElementById('.progressbar').style.width == "100%"){
                $('#habitProgress').addClass('neonGlow')
            }

           
        }
    }
});