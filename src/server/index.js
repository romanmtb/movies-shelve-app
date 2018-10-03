//Namespaces to avoid warnings:
/** @namespace req.params.movieId */
/** @namespace router.use */
/** @namespace router.get */
/** @namespace router.route */

//inspired with: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const admin = require('firebase-admin');
const firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDmNmhYd8smrolZuwd5W1WsQtsJBh3ddfM",
    authDomain: "react-movies-shelve.firebaseapp.com",
    databaseURL: "https://react-movies-shelve.firebaseio.com",
    projectId: "react-movies-shelve",
    storageBucket: "react-movies-shelve.appspot.com",
    messagingSenderId: "825999127196"
};

firebase.initializeApp(config);
var database = firebase.database();
var all = database.ref().once('value').then(function (snapshot) {
  console.log(snapshot.val().movie);
})

const PORT = 4125

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes(app);
// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.route('/movies').post(function (req, res) {
  res.json({message: 'movie created!'});
}).get(function (req, res) {
  database.ref().once('value').then(function (snapshot) {
    res.json(snapshot.val().movie);
  })
});

router.route('/movies/:movieId')
  .get(function (req, res) {
    res.json({message: `${req.params.movieId} get this movie`});
  })
  .put(function (req, res) {
    res.json({message: `${req.params.movieId} update this movie`});
  })
  .delete(function (req, res) {
    res.json({message: `${req.params.movieId} movie deleted`});
  });

app.use('/api', router);


const server = app.listen(PORT, function () {
  console.log("app running on port.", server.address().port);
});