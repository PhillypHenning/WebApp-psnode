const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController')
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getById} = bookController(nav, bookService);
  const { authenticate } = authController();

  bookRouter.use(authenticate)

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
};

module.exports = router;