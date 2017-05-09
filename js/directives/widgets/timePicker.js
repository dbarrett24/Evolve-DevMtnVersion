angular.module('app').directive('timePicker', function(mainService){
    return{
        restrict: 'AE',
        templateUrl: './views/directives/widgets/timePicker.html',
        scope: {
            timePickerTitle: '@'
            
        },
        link: function(scope, elem, attrs){
                $("#commit").on('click', function(){
                    // mainService.reminderTime = scope.reminderTime;
                    mainService.reminderTime = $('#reminder_time').val();
                    // console.log(mainService.reminderTime)
                })
      
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
          

        },
        controller: function($scope, mainService, $interval){
            
          
        }
    }
});