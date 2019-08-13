const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

// Middleware
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.set('views', './src/views/');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

var books = [
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

// Routes
// Sets up the root of `/books/`
bookRouter.route('/')
    .get((req, res) => {
        res.render('books',
            {
                nav: [{ link: '/books', title: 'Books' },
                { link: '/authors', title: 'Authors' }],
                title: 'Library', 
                books
            }
        );
    });

bookRouter.route('/single').get((req, res) => { res.send('single book'); });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index',
        {
            nav: [{ link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' }],
            title: 'Library'
        });
});

// Server
app.listen(port, () => {
    debug(`Listening on port ${chalk.yellow(port)}`);
});
