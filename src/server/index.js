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
const cors = require('cors');
const admin = require('firebase-admin');
const firebase = require("firebase");
const PORT = 4125

let config = {
    apiKey: "AIzaSyDmNmhYd8smrolZuwd5W1WsQtsJBh3ddfM",
    authDomain: "react-movies-shelve.firebaseapp.com",
    databaseURL: "https://react-movies-shelve.firebaseio.com",
    projectId: "react-movies-shelve",
    storageBucket: "react-movies-shelve.appspot.com",
    messagingSenderId: "825999127196"
};

firebase.initializeApp(config);
let database = firebase.database();

//variable, which holds highest ID
let LAST_ID = -1;

database.ref().once('value').then(function (snapshot) {
   LAST_ID = Math.max.apply(null, Object.keys(snapshot.val().movie));
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  //console.log('Something is happening.');
  next();
});

//DEFAULT ROUTE
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

//ADD
router.route('/movies').post(function (req, res) {
  LAST_ID++;
  firebase.database().ref('movie/' + LAST_ID).set(
    req.body.movie, function(error) {
    if (error) {
      res.json({message: 'ERROR'});
    } else {
      res.json({message: 'movie created!'});
      //FIXME #2 add error handling for requests
    }
  })
//GET ALL
}).get(function (req, res) {
  database.ref().once('value').then(function (snapshot) {
    res.json(snapshot.val().movie);
  })
  .catch();  //FIXME #2 add error handling for requests
});

//GET BY ID
router.route('/movies/:movieId')
  .get(function (req, res) {
    database.ref().once('value').then(function (snapshot) {
      res.json(snapshot.val().movie[req.params.movieId])
  })
  .catch(); 
  })

  //UPDATE
  .put(function (req, res) {
    firebase.database().ref('movie/' + req.params.movieId).update(req.body.movie).then(i =>
      res.json({message: `${req.params.movieId} update this movie`})
    )
      .catch();  //FIXME #2 add error handling for requests
  })
  //DELETE
  .delete(function(req, res) {
    firebase.database().ref('movie/' + req.params.movieId).remove()
      .then(i =>
        res.json({message: `${req.params.movieId} movie deleted`})
      )
      .catch(); //FIXME #2 add error handling for requests
  });

app.use('/api', router);

const server = app.listen(PORT, function () {
  console.log("app running on port.", server.address().port);
});
