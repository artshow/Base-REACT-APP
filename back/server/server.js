// -> Imports for environment variables
require('./config/config');

// --> Import config
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const port = process.env.PORT || 3001;

// -> Import mongoose connect
const { mongoose } = require('./db/mongoose');

// -> Imports middlewares
const { authentificate } = require('./middlewares/authentificate');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000"); // -> Remplacer par Process.env.BASE_URL_APP
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'x-auth, access-control-allow-origin, XMLHttpRequest, Origin, X-Requested-With, Content-Type, Accept, authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS,PATCH');
  res.header('Access-Control-Expose-Headers', 'x-auth');
  next();
});

app.get('/', (req, res) => {

  res.send('API OK');
});

const userRoutes = require('./routes/users');

app.use('/user', userRoutes);

app.listen(port, () => {
		// -> Start app
    console.log('Stated on port '+ port);
});

module.exports = { app };
