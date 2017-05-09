angular.module('app').directive('colorPicker', function(mainService){
    return{
        restrict: 'AE',
        templateUrl: './views/directives/widgets/colorPicker.html',
        link: function(scope, elem, attrs){
            
                var colorButton = $(".color-choices li")
                colorButton.on("click", function(){
                // Remove class from currently active button
                $(".color-choices > li").removeClass("active-color")
                // Add class active to clicked button
                $(this).addClass("active-color")
                // Get background color of clicked
                var newColor = $(this).attr("data-color")
                // Change background of everything with class .bg-color
                $(".bg-color").css("background-color", newColor)
                // Change color of everything with class .text-color
                $(".text-color").css("color", newColor)

            });
            
                scope.colorSelect = function(color){
                    // console.log(color);
                    mainService.selectedColor = color;
                }

        }
    }
});