const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./config');
const app = module.exports = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: config.secret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/dist'));

//FILES and CUSTOM MIDDLEWARE


// DATABASE //
const db = massive.connectSync({connectionString : config.elephantSQL});
app.set('db', db);
const habitsCtrl = require('./server-controllers/habitsCtrl');

//RESETS ALL TABLES (**USE ONLY IN DEVELOPMENT**)
db.set_schema(function(err, data){
    if(err)console.log(err);
    else console.log("All tables successfully reset");
});
/////////////

passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database

    console.log('profile thing', profile)
    db.getUserByAuthId([profile.id], function(err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile.displayName, profile.id, profile._json.picture_large, profile.name.givenName, profile.name.familyName], function(err, user) {
          console.log('USER CREATED', user); //used to be userA
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session, 
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  var userC = userB;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
});


//AUTH ENDPOINTS
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})

// //redirect to auth login page
// app.get(function(req, res, next){
//   console.log(req.user)
//   if (!req.user){
//     res.redirect('/auth');
//     return;
//   }
//   next();
// })

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})




//ENDPOINTS

//Habits
app.get('/api/getHabits', habitsCtrl.getHabits);
app.post('/api/createHabit', habitsCtrl.createHabit);
app.put('/api/editHabit', habitsCtrl.editHabit);
app.delete('/api/deleteHabit/:id', habitsCtrl.deleteHabit);
app.put('/api/reportStreak/:id', habitsCtrl.reportStreak);

//Users



app.listen(config.port, function(){
    console.log('listening on ', config.port);
});