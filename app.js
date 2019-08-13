const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const sql = require('mssql');
const conconfig = require('./conf/settings');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }];

const config = {
    user: conconfig['user'],
    password: conconfig['password'],
    server: conconfig['server'],

    options: {
        encrypt: true,
        database: conconfig['database']
    }
}

// Defined routes
const bookRouter = require('./src/routes/bookRoutes')(nav);


// Middleware
sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.set('views', './src/views/');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// Index route
app.use('/books', bookRouter);
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index',
        {
            nav,
            title: 'Library'
        });
});

// Server
app.listen(port, () => {
    debug(`Listening on port ${chalk.yellow(port)}`);
});
