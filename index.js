const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');

const app = module.exports = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/dist'));

//FILES and CUSTOM MIDDLEWARE
const config = require('./config');

//DATABASE
const db = massive.connectSync({connectionString : config.elephantSQL});
app.set('db', db);

db.set_schema(function(err, data){
    if(err)console.log(err);
    else console.log("All tables successfully reset");
});

//ENDPOINTS



app.listen(config.port, function(){
    console.log('listening on ', config.port);
});