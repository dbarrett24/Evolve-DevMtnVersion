angular.module('app').directive('colorPicker', function(mainService){
    return{
        restrict: 'AE',
        templateUrl: './views/directives/widgets/colorPicker.html',
        scope: {
            colorValue: "="
        },
        link: function(scope, elem, attrs){

                 scope.colorSelect = function(color){
                    //assigns data value of selected color to variable in mainService
                    mainService.selectedColor = color;
                    // mainService.editedColor = color;

                    // Remove class from currently active button
                    $(".color-choices > li").removeClass("active-color")
                    // Add class active to clicked button
                    $(this).addClass("active-color")
                    // Get background color of clicked
                    scope.colorValue = color;
                  
                }

        }
    }
});