// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/", function (req, res) {
  let rDate = new Date();
  res.json({utc: rDate.toUTCString(), unix: Math.floor(rDate.getTime())});
});

app.get("/api/:date", function (request, response) {
  let rDate;
  try {
    if (request.params.date == "") {
      rDate = new Date();
    } else if (!isNaN(request.params.date)) {
      rDate = new Date(Number(request.params.date) );
    } else {
      rDate = new Date(request.params.date);
    }
  }
  catch(err) {
    rDate = "Invalid Date";
  }
  
  let resObj = {};
  if (rDate != "Invalid Date") {
    resObj.utc = rDate.toUTCString();
    resObj.unix = Math.floor(rDate.getTime());   
  } else {
    resObj.error = "Invalid Date";
  };

  response.json(resObj);
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
