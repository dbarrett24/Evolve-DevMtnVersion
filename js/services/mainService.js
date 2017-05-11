angular.module('app').service('mainService', function($http){
    var self = this;
    // *****************************
        this.test = "Controller & Service are working";

        this.reminderTime = "8:00 PM";
        this.selectedColor = "blue";
        this.date = new Date();
    // *****************************
    
    this.getHabits = function(){
        return $http({
            method: 'GET',
            url: '/api/getHabits'
        }).then(function(response){
            // console.log(response.data);
            return response.data;
        })
    }
  
    this.newHabit = function(newHabit, newHabitFrequency){
        newHabit.color = this.selectedColor;
        newHabit.reminder_time = this.reminderTime;
        newHabit.date_created = this.date.toLocaleDateString();
        newHabit.time_created = this.date.toLocaleTimeString();
        // console.log(newHabit, newHabitFrequency);
        return $http({
            method: 'POST',
            url: '/api/createHabit',
            data: {newHabit, newHabitFrequency}
        }).then(function(response){
            // console.log(response);
            // self.getHabits();
            return response;
        });
    }

    this.editHabit = function(editedHabit, editFrequency){
        console.log(editedHabit, editFrequency);
        return $http({
            method: 'PUT',
            url: '/api/editHabit',
            data: {editedHabit, editFrequency}
        }).then(function(response){
            // console.log(response);
            // self.getHabits();
            return response;
        });
    }

    this.deleteHabit = function(id){
        // console.log(deletedHabit);
        return $http({
            method: 'DELETE',
            url: '/api/deleteHabit/' + id,
        }).then(function(response){
            return response;
        });
    }

    
});