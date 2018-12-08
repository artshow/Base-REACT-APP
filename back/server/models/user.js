const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Users = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			isAsync: true,
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	pseudo: {
		type: String,
		minlength: 3
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

/**
 * Set parameters
 * For toJSON
 * For toOjbect
 **/
Users.set('toJSON', { getters: true, virtuals: true });
Users.set('toObject', { getters: true, virtuals: true });
mongoose.set('useCreateIndex', true)


/**
 * to JSON
 * @param void
 * @return Object user
 */
Users.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, [
    '_id',
    'email',
    'pseudo',
		'tokens'
  ]);
};


/**
 * Set before save
 */
Users.pre('save', function(next) {
  var user = this;
  // -> If password is modified
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/**
 * Generate auth token
 * @param void
 * @return String token
 */
Users.methods.generateAuthToken = function() {
  const access = 'auth';
  const token = jwt
    .sign({ _id: this._id.toHexString(), access }, "x4oRnq5p4FB8zIPWuMLonNKTgmnO7P3o")
    .toString();

  return this.updateOne({
    $push: {
      tokens: {
        access,
        token
      }
    }
  }).then(() => {

    return token;
  })
	.catch(error => {

		console.log("error", error)

	})
};

/**
 * Find user by credentials {mail, password}
 * @param String email
 * @param String password
 * @return Object user
 */
Users.statics.findByCredentials = function(email, password) {
  return this.findOne({ email }).then(user => {
    return new Promise((revolve, reject) => {
      if (!user) {
        reject();
      }
      // use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          revolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

/**
 * Find user by token
 * @param String token
 * @return Object user
 */
Users.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};



const User = mongoose.model('Users', Users);

module.exports = { User };
