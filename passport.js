const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('./models.js');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      try {
        const user = await Users.findOne({ Username: username });

        if (!user) {
          console.log('Incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        const isValidPassword = await bcrypt.compare(password, user.Password);

        if (!isValidPassword) {
          console.log('Incorrect password');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        console.log('Authentication successful');
        return callback(null, user);
      } catch (error) {
        console.log('Error during authentication:', error);
        return callback(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    },
    async (jwtPayload, callback) => {
      try {
        const user = await Users.findById(jwtPayload._id);
        return callback(null, user);
      } catch (error) {
        return callback(error);
      }
    }
  )
);
