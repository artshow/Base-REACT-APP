const _ = require('lodash');
const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();

// -> Import User Model
const { User } = require('../models/user');

/*********************
  Summary
  -------------
	Create
	Login
	List all
********************/

 /**
  * Create user
  * @method POST
  * @param void
  * @return {Object} data
  */
 router.post('/create', (req, res) => {

   // -> Pick data from body in request
   const body = _.pick(req.body, ['pseudo', 'email', 'password']);

   // -> Create new user entity
   const user = new User(body);

   // -> Save new user
   user
     .save()
     .then(() => {
       // -> Return generated token
       return user.generateAuthToken();
     })
     .then(
       token => {
         // -> Send token and user
         res.header('x-auth', token).send(user);
       })
       .catch(error => {

				// -> Send error
        res.status(400).send(error);

			 })


 });


 /**
 * Login user
 * @method POST
 * @param void
 * @return {Object} data
 */
router.post('/login', (req, res) => {
	// -> Get body from req
  const { body } = req;

	// -> Get email and password from body
	const { email, password } = body;

  // -> Find user with email and password
  User.findByCredentials(email, password).then(
    user => {
      // -> Generate auth token then return token in header and send user
      return user.generateAuthToken().then(token => {

        res.header('x-auth', token).send(user);
      });
    },
    error => {
      // -> Send error
      res.status(400).send('Not auth');
    }
  );
});


 /**
  * List all users
  * @method GET
  * @param void
  * @return {Object} data
  */
 router.get("/list", (req, res) => {

	 User.find({})
	 	.then(users => {

		 	// -> Send users
		 	res.send(users)

	 	})
	 	.catch(error => {
			// -> Send error
		 	res.send(error)

	 })

 })



 module.exports = router;
