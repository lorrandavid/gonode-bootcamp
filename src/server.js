const dateFilter = require('nunjucks-date-filter');
const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.static(path.resolve(__dirname, 'public')));
    this.express.use(flash());
    this.express.use(
      session({
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions'),
        }),
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        saveUninitialized: true,
      }),
    );
  }

  views() {
    const njk = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: process.env.NODE_ENV,
      express: this.express,
    });
    njk.addFilter('date', dateFilter);
    this.express.set('view engine', 'njk');
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
