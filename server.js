var express = require('express');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var router = express.Router();              // get an instance of the express Router
var ugs = require('ultimate-guitar-scraper');

// port to run the app on
const port = process.env.PORT || 80;

// FRONTEND
app.use('/', express.static('./dist'));

// BACKEND
app.use('/api', router);

app.listen(port);

console.log('Server is running on port ' + port);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/song', function(req, res) {

var name = req.query.name;
var artist = req.query.artist;

  var query = {
    query: name,
    type: ['Chords']
  }

  function callback (error, tabs, response, body) {
    if (error) {
      console.log(error)
    } else {
      let tabFilteredByArtist = tabs.filter(hi => hi.artist === artist);
      let tabSortedByBest = tabFilteredByArtist.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      let tabUrl = tabSortedByBest[0]['url']
      ugs.get(tabUrl, function (error, tab) {
        if (error) {
          console.log(error)
        } else {
          res.json(tab);
        }
      })
    }
  }

  ugs.search(query, callback)

});





















//
// //PRE API CREATION SERVER FILE IS FOUND BELOW
//
//
// const express = require('express');
//
// // //Casey addition
// // const cors = require('cors');
//
// // port to run the app on
// const port = process.env.PORT || 80;
//
// // create the main instance of the app
// const app = express();
//
// // //Casey addition
// // app.use(function(req, res, next) {
// //   res.header('Access-Control-Allow-Origin', "*");
// //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// //   res.header('Access-Control-Allow-Headers', 'Content-Type');
// //   next();
// // });
//
// // FRONTEND
// app.use('/', express.static('./dist'));
// // add in /api
//
// // //Casey addition
// // app.use(cors());
//
// app.listen(port);
//
// console.log('Server is running on port ' + port);
