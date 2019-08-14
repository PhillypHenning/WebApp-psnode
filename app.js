const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const sql = require('mssql');
const conconfig = require('./conf/settings');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }];

// mssql - Dead connection code. 
/* const config = {
  user: conconfig['user'],
  password: conconfig['password'],
  server: conconfig['server'],

  options: {
    encrypt: true,
    database: conconfig['database']
  }
} */

// Defined routes
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')();


// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.set('views', './src/views/');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// Index route
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// Home page
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
