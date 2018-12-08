const { User } = require('./../models/user');

const authentificate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {

      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
			console.log("error", e)
      //next();
      res.status(401).send('Not auth');
    });
};

module.exports = { authentificate };
