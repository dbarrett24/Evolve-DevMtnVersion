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
                res.status(200).send("Product successfully deleted", deleted);
            }
        })
    }

}