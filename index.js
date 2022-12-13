// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//added dotenv for PORT
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//empty date parameter returns current time
app.get("/api", function(req, res) {
  res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString() });
});

//date parameter not empty
app.get("/api/:date?", function(req, res) {
  //valid unix
  if (Number(req.params.date)) {
    res.json({ "unix": new Date(Number(req.params.date)).getTime(), "utc": new Date(Number(req.params.date)).toUTCString() });
  }
  //invalid input date string
  else if (new Date(req.params.date).toString() == "Invalid Date") {
    res.json({error: "Invalid Date" });
  } 
  //valid input date string
  else {
      res.json({ "unix": new Date(req.params.date).getTime(), "utc": new Date(req.params.date).toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
