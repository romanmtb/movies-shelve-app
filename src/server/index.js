//Namespaces to avoid warnings:
/** @namespace req.params.movieId */
/** @namespace router.use */
/** @namespace router.get */
/** @namespace router.route */

//inspired with: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const url = require('url');
const firebase = require('firebase');
const PORT = 4125;

let config = {
  apiKey: 'AIzaSyDmNmhYd8smrolZuwd5W1WsQtsJBh3ddfM',
  authDomain: 'react-movies-shelve.firebaseapp.com',
  databaseURL: 'https://react-movies-shelve.firebaseio.com',
  projectId: 'react-movies-shelve',
  storageBucket: 'react-movies-shelve.appspot.com',
  messagingSenderId: '825999127196',
};

firebase.initializeApp(config);
let database = firebase.database();

//variable, which holds highest ID
let LAST_ID = -1;
let isInit = false;

database
  .ref('options')
  .once('value')
  .then(function(snapshot) {
    LAST_ID = snapshot.val().max_id;
    isInit = true;
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to use for all requests
router.use(function(req, res, next) {
  if (!isInit)
    res
      .status(503)
      .json({ message: 'server not connected to DB, please wait for a while' });
  // do logging
  //console.log('Something is happening.');
  next();
});

//DEFAULT ROUTE
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/movies/upload').post(function(req, res) {
  for (let i in req.body.movie) {
    let current = req.body.movie[i];
    LAST_ID++;
    let movie = { ...current, id: LAST_ID };
    firebase
      .database()
      .ref('movie/' + LAST_ID)
      .set(movie);
  }
  res.json({ message: 'ok' });
});
//ADD
router
  .route('/movies')
  .post(function(req, res) {
    LAST_ID++;
    let movie = { ...req.body.movie, id: LAST_ID };
    firebase
      .database()
      .ref('movie/' + LAST_ID)
      .set(movie, function(error) {
        if (error) {
          res.json({ message: 'ERROR' });
        } else {
          firebase
            .database()
            .ref('options')
            .set({ max_id: LAST_ID });
          res.json({ message: movie, status: 'ok' });
        }
      });

    //GET ALL
  })
  .get(function(req, res) {
    database
      .ref()
      .once('value')
      .then(function(snapshot) {
        res.json(snapshot.val().movie);
      })
      .catch(); //FIXME #2 add error handling for requests
  });

//SEARCH
router.route('/movies/search').get(function(req, res) {
  let finalArray = [];
  let a = url.parse(req.url, true);
  database
    .ref()
    .once('value')
    .then(function(snapshot) {
      let currentDb = snapshot.val().movie;
      let temp = Object.keys(a.query);
      let flag = false;
      if (temp[0] === 'actor') {
        for (let idx in currentDb) {
          let currentItem = currentDb[idx];
          let some = a.query.actor.toLowerCase();
          let stars = currentItem.stars;
          for (let i in stars) {
            let currentStar = stars[i].toLowerCase();
            if (currentStar.indexOf(some) !== -1) {
              flag = true;
            }
          }
          if (flag === true) {
            finalArray.push(currentItem);
            flag = false;
          }
        }
      } else if (temp[0] === 'title') {
        for (let idx in currentDb) {
          let currentItem = currentDb[idx];
          let some = a.query.title.toLowerCase();
          let title = currentItem.title.toLowerCase();
          if (title.indexOf(some) !== -1) {
            finalArray.push(currentItem);
          }
        }
      }
      res.json({ message: finalArray });
    });
});

//GET BY ID
router
  .route('/movies/:movieId')
  .get(function(req, res) {
    database
      .ref()
      .once('value')
      .then(function(snapshot) {
        res.json(snapshot.val().movie[req.params.movieId]);
      });
  })
  //UPDATE
  .put(function(req, res) {
    firebase
      .database()
      .ref('movie/' + req.params.movieId)
      .update(req.body.movie)
      .then(i => res.json({ message: req.body.movie, status: 'ok' }))
      .catch(); //FIXME #2 add error handling for requests
  })
  //DELETE
  .delete(function(req, res) {
    database
      .ref()
      .once('value')
      .then(function(snapshot) {
        if (snapshot.val().movie[req.params.movieId] === undefined) {
          res.status(426).json({ message: 'item not found' });
        } else {
          firebase
            .database()
            .ref('movie/' + req.params.movieId)
            .remove()
            .then(i => {
              res.json({ message: req.body.movie, status: 'ok' });
            })
            .catch(err => res.status(426).json({ message: err }));
        }
      });
  });

app.use('/api', router);

const server = app.listen(PORT, function() {
  console.log('app running on port.', server.address().port);
});
