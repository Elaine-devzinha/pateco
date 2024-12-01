'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// logs no terminal
app.use(logger('dev'));
// suporte a json
app.use(express.json());
// parse request bodies (req.body)
app.use(express.urlencoded({ extended: false }));

// load controllers
require('./lib/boot.js')(app, { verbose: true });


module.exports = app;
