'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
//var logger = require('morgan'); / veja a necessidade de tirar essa linha

var app = express();

//logs no terminal
//app.use(logger('dev')); // e essa linha
// suporte a json
app.use(express.json());

//Usado para analisar variaveis dentro da URL
app.use(express.urlencoded({ extended: false }));

// carrega os controladores usando o modulo de boot.js
require('./lib/boot.js')(app, { verbose: true });

//exporta o servidor para /bin/www
module.exports = app;
