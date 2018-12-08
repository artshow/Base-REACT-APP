const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// -> Mettre URL BASE DE DONNEES OU PROCESS.ENV.MONGODB_URI
//mongoose.connect('URL MLAB', { useNewUrlParser: true });

module.exports = { mongoose };
