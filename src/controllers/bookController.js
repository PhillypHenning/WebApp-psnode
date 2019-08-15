const debug = require('debug')('app:bookController');
const { MongoClient, ObjectId } = require('mongodb');

function bookController(nav) {

  function getIndex(req, res) {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug(`Connected to the mongo server at:  ${url}`);

        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();

        res.render('bookList',
          {
            nav,
            title: 'Library',
            books
          });

      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  };

  function getById(req, res) {
    const { id } = req.params;
    debug(id);
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug(`Connected to the mongo server at:  ${url}`);

        const db = client.db(dbName);
        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectId(id) });

        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: book,
            id
          }
        );

      } catch (err) {
        debug(err.stack);
      }
    }());
  };

  function authenticate(req, res, next) {
    if(req.user){next()} else {res.redirect('/');}
  };

  return {
    getIndex,
    getById, 
    authenticate
  }
}

module.exports = bookController;