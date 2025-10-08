const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const Models = require('./models.js');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// ---- LocalStrategy for login ----
passport.use(new LocalStrategy(
  {
    usernameField: 'Username',
    passwordField: 'Password'
  },
  async (Username, Password, done) => {
    try {
      const user = await Users.findOne({ Username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isValid = await bcrypt.compare(Password, user.Password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// ---- JWTStrategy for authentication ----
passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
  },
  async (jwtPayload, done) => {
    try {
      // Adjust this depending on your JWT payload
      const user = await Users.findById(jwtPayload._id);
      // Or: const user = await Users.findOne({ Username: jwtPayload.sub });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport;
