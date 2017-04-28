// requires
var express = require ('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var pg = require('pg');

// setup config for the pool
var config = {
  database: 'pethotel',
  host: 'localhost',
  port: 5432,
  max: 20
};
// create new pool using config
var pool = new pg.Pool(config);
// static folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
 // spin up server
app.listen(port, function(){
  console.log('server up on', port);
});
// base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});
app.post('/addClient', function(req, res){
  console.log('addClient route');
  var clientObject = {
    response: ('from addClient' , req.body)};
    pool.connect(function(err, connection, done){
      if (err) {
        console.log(err);
        res.send(400);
      } else {
        console.log('connected');
        res.send(clientObject);
      }
      connection.query("INSERT into hotel (firstname, lastname ) values ($1, $2)", [req.body.firstName, req.body.lastName]);
      done();
    });
  });
  app.post('/addPet', function(req, res){
    console.log('addPet route');
    var petObject = {
      response: ('from addPet' , req.body)};
      pool.connect(function(err, connection, done){
        if (err) {
          console.log(err);
          res.send(400);
        } else {
          console.log('connected');
          res.send(petObject);
        }
        connection.query("INSERT into hotel (pet, breed, color) values ($1, $2, $3)", [req.body.petName, req.body.petBreed, req.body.petColor]);
        done();
      });
    });
app.get('/getClients', function(req, res){
  console.log('getClient route');
  var allClients = [];
  pool.connect(function(err, connection, done){
    if (err) {
      console.log(err);
      res.send(400);
    } else {
      console.log('connected get clients');
      var resultSet = connection.query("SELECT firstname, lastname FROM hotel");
      resultSet.on('row', function (row) {
        console.log('are you running?', row);
        allClients.push(row);
      });
      resultSet.on('end', function(){
        console.log('allClients ->', allClients);
        res.send(allClients);
      done();
    });
    }
  });
});
