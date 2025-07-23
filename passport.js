const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, async (username, password, callback) => {
  try {
    const user = await Users.findOne({ Username: username });
    if (!user || !user.validatePassword(password)) {
      return callback(null, false, { message: 'Incorrect username or password.' });
    }
    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
}, async (jwtPayload, callback) => {
  try {
    return callback(null, await Users.findById(jwtPayload._id));
  } catch (error) {
    return callback(error);
  }
}));