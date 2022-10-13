// import packages //
const path = require('path');
require('dotenv').config();
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');


const hbs = exphbs.create({ helpers });

// Initialize sessions
const sess = {
    secret: 'secret secret',
    cookie: { maxAge: 7200000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as the template engine for the server //
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session(sess));

// Give the server the path to the routes //
app.use(routes);

// Turn on connection to db and then to the server //
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });