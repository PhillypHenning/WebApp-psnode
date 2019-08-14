const express = require('express');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');
var path = require('path');
var appDir = path.dirname(require.main.filename)
const books = require(`${appDir}/books.json`);

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://127.0.0.1:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug(`Connected to the mongo server at:  ${url}`);

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);

        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
