const express = require('express');
const bookRouter = express.Router();

function router(nav) {
    const books = [
        {
            "author": "Chinua Achebe",
            "country": "Nigeria",
            "language": "English",
            "pages": 209,
            "title": "Things Fall Apart",
            "year": 1958
        },

        {
            "author": "Hans Christian Andersen",
            "country": "Denmark",
            "language": "Danish",
            "pages": 784,
            "title": "Fairy tales",
            "year": 1836
        },

        {
            "author": "Dante Alighieri",
            "country": "Italy",
            "language": "Italian",
            "pages": 928,
            "title": "The Divine Comedy",
            "year": 1315
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            res.render('bookList',
                {
                    nav,
                    title: 'Library',
                    books
                }
            );
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Library',
                    book: books[id],
                    id
                }
            );
        });

    return bookRouter;
};


module.exports = router;