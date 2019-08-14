const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRouter');
const { MongoClient, ObjectId } = require('mongodb');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
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
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
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
    });

  return bookRouter;
};


module.exports = router;