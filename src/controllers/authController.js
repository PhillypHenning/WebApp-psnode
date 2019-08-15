const debug = require('debug')('app:authController');
const { MongoClient } = require('mongodb');

function authController(nav) {
  function authenticate(req, res, next) {
    if (req.user) { next() } else { res.redirect('/'); }
  };

  function signUp(req, res) {
    const { username, password } = req.body;
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'libraryApp';

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug(`Connected to the mongo server at:  ${url}`);

        const db = client.db(dbName);

        const col = db.collection('users');
        const user = { username, password };
        const results = await col.insertOne(user);
        debug(results);

        // create user
        // log user in
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });

      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function signIn(req, res) {
    res.render('signin', {
      nav,
      title: 'Sign In'
    });
  }

  function profile(req, res) {
    res.render('profile', {
      nav,
      title: req.user.username
    });
  }



  return {
    authenticate,
    signUp,
    signIn,
    profile
  };
}

module.exports = authController;