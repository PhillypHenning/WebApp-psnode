const passport = require('passport');
const debug = require('debug')('app:passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores a user in the session
  passport.serializeUser((user, done)=>{
    done(null, user);
  });


  // Retrieves a user from the sesssion 
  passport.deserializeUser((user, done) => {
    debug(`User retrieved: ${user}`)
    done(null, user);
  });
};
