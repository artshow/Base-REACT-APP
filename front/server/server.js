const _ = require('lodash');
const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');

var app = express();

const port = process.env.PORT || 3000;

// Use public path
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.get('/app', (req, res) => {
  res.render('app.ejs');
});

app.listen(port, () => {
  console.log('Stated on port ' + port);
});

module.exports = { app };
