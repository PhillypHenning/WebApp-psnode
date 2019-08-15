const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
const authController = require('../controllers/authController');

function router(nav) {
    const { signUp, signIn, authenticate, profile } = authController(nav);

  authRouter.route('/signUp')
    .post(signUp);

  authRouter.route('/signIn')
    .get(signIn)
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
      }));

  
  authRouter.route('/profile')
    .all(authenticate)
    .get(profile);

  return authRouter;
};

module.exports = router;