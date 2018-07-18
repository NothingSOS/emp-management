const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');
require('./config/passport')(passport);

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use('/static', express.static(path.resolve(__dirname, 'storage', 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(routes);
app.use(errorHandler);

module.exports = app;
