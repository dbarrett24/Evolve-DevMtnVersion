const app = require('../index');
const db = app.get('db');

module.exports = {
    createHabit: function(req, res, next){
        let newHabit = req.body.newHabit;
        let frequency = req.body.newHabitFrequency;
     
        db.create_habit([newHabit.title, newHabit.color, newHabit.date_created, newHabit.time_created, newHabit.reminder_time],function(err, habit_id){
            // res.status(200).send(habits);
            if(err){
                res.send(err);
            } else{
                console.log(habit_id);
                db.create_new_frequency([Number(habit_id[0].id), frequency.monday, frequency.tuesday, frequency.wednesday, frequency.thursday, frequency.friday, frequency.saturday, frequency.sunday], function(err2, response){
                    if(err2){
                        res.send(err2);
                    } else{
                        res.status(200).send(response);
                    }
                })       
            }
        });
    },

    getHabits: function(req, res, next){
        db.get_habits(function(err, response){
            if(err){
                console.log(err)
            } else{
                res.status(200).send(response);
            }
        })
    },

    deleteHabit: function(req, res, next){
        db.delete_habit([id],function(err, deleted){
            if(err){
                console.log(err)
            } else{
                res.status(200).send(deleted);
            }
        })
    },

    editHabit: function(req, res, next){
        let editHabit = req.body.Habit;
        let editFrequency = req.body.HabitFrequency;
        console.log(editHabit, editFrequency)
        db.edit_habit([editHabit.title, editHabit.color, editHabit.reminder_time, editHabit.id],function(err, habit_id){
            console.log(habit_id)
            // res.status(200).send(habits);
            if(err){
                res.send(err);
            } else{
                
                db.edit_habit_frequency([editFrequency.monday, editFrequency.tuesday, editFrequency.wednesday, editFrequency.thursday, editFrequency.friday, editFrequency.saturday, editFrequency.sunday, editFrequency.habit_id], function(err2, response){
                    if(err2){
                        res.send(err2);
                    } else{
                        res.status(200).send(response);
                    }
                })       
            }
        });

    }

}