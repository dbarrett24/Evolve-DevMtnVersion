module.exports = {
    createHabit: function(req, res, next){
        db.create_habit(function(err, habits){
            res.status(200).send(habits);
            
        });
    }
}