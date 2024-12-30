'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var path = require('path');


module.exports = function(parent, options){
  //salva o diretorio dos controladores
  var dir = path.join(__dirname, '..', 'controllers');
  //verifica se a opção verbose foi inserida
  var verbose = options.verbose;
  //lendo paths do diretorio 'dir'
  fs.readdirSync(dir).forEach(function(name){
    //monta caminho até o controlador
    var file = path.join(dir, name)
    //verifica se o arquivo é um diretorio, se não for, retorna nada
    if (!fs.statSync(file).isDirectory()) return;
    //esse jeito doido do express, se verbose for true && consologa o nome do
    //controlador, isso por que console.log retorna um valor então é inter
    //pretado como true, mas antes disso ele precisa que verbose seja true.
    //é uma das perolas do nodejs
    verbose && console.log('\n   %s:', name);
    //puxa o objeto do arqvuivo
    var obj = require(file);
    //name é igual a obj.name (se existir), ou name, variavel definida no
    //momento da leitura dos arquivos
    var name = obj.name || name;
    //prefix é igual a obj.prefix (se existir), ou uma string vazia
    var prefix = obj.prefix || '';
    //executa o app do express
    var app = express();
    
    var posfix;
    var handler;
    var method;
    var url;
    for (var key in obj) {
      //objetos reservados
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      //exportando as rotas
      switch (key) {
        case 'show':
          method = 'get';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'list':
          method = 'get';
          url = '/' + name + 's';
          break;
        case 'edit':
          method = 'get';
          url = '/' + name + '/:' + name + '_id/edit';
          break;
        case 'update':
          method = 'put';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'delete':
          method = 'delete';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'create':
          method = 'post';
          url = '/' + name;
          break;
        case 'index':
          method = 'get';
          url = '/';
          break;
        default:
          throw new Error('Rota Desconhecida: ' + name + '.' + key);
      }

      // setup
      handler = obj[key];
      posfix = obj[key].posfix || ''
      if(key != 'index') url =  url + '/' + posfix
      if(key == 'index') url = prefix + url + posfix
      
      app[method](url, require('../lib/resourceNameHandle')(name, key));
      
      // before middleware support
      
      if (obj.before) {
        app[method](url, obj.before, handler);
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
      } 
      if(obj[key].before){
        app[method](url, obj[key].before, handler)
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
      } 
      
      if (!obj[key].before && !obj.before) {
        app[method](url, handler);
        verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key);
      }

    }

    // mount the app
    parent.use(app);
  });
};