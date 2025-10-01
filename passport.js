const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('./models.js');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// ---- LocalStrategy for login ----
passport.use(new LocalStrategy(
  {
    usernameField: 'Username',  // uppercase as in your DB
    passwordField: 'Password'   // uppercase as in your DB
  },
  async (Username, Password, done) => {
    try {
      const user = await Users.findOne({ Username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isValid = bcrypt.compareSync(Password, user.Password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
  },
  async (jwtPayload, done) => {
    try {
      const user = await Users.findById(jwtPayload._id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
