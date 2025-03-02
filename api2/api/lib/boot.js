'use strict'

/**
 * Module dependencies.
 */


// Como funciona esse arquivo e como se usa ele.

// Esse é um arquivo chamado autoload, ele automaticamente carrega
// as bibliotecas / funções do aplicativo.

// para usa-lo, use a função require() do node e insira o caminho p/ o arquivo
// você pode usar o require tanto para executar o arquivo ou para carregalo numa
// variavel e usar posteriormente no codigo. Ao executar a função exportada
// é obrigatorio a inserção de 2 variaveis, server e options.
// Cujo server significa o app principal, pois sua tarefa principal é servir
// todos as rotas e interpretar as requisições cookies e etc, fica aberto a sugestões

// e options como o nome sugere, são as opções para definir caso necessario,
// a unica que é interpretada é a opção verbose que, ou verboso, alguem ou algo que fala
// muito, e é usado para sabermos quais bibliotecas foram carregadas pelo Terminal



var express = require('express');
var fs = require('fs');
var path = require('path');

// função exportada por padrão
// recebe o servidor express como server
// e opções

module.exports = function(server, options){
  //busca pelo diretorio dos controlladores
  var dir = path.join(__dirname, '..', 'controllers');
  //verifica se a opção verbose foi inserida
  var verbose = options.verbose;
  //fazendo um loop em todas as pastas dentro de /controllers
  fs.readdirSync(dir).forEach(function(name){ // exporta name que é o nome da pasta do controlador
    //monta caminho até o controlador
    var file = path.join(dir, name)
    //verifica se o arquivo é um diretorio, se não for, retorne nada
    if (!fs.statSync(file).isDirectory()) return;
    //esse jeito doido do express, se verbose for true && consologa o nome do
    //controlador, isso por que console.log retorna um valor então é inter
    //pretado como true, mas antes disso ele precisa que verbose seja true.
    //é uma das perolas do nodejs
    verbose && console.log('\n   %s:', name);
    //requere o arquivo index.js dentro de controller/<nome do controlador>
    var obj = require(file);
    //verifica se o arquivo requerido possui o objeto name definido, se não,
    //retorna o nome definido no momento da leitura do arquivo
    var name = obj.name || name;
    //verifica se o arquivo requerido possui o objeto prefix definido, se não,
    //retorna uma string vazia
    var prefix = obj.prefix || '';
    //executa o app do express
    var app = express();
    
    //variaveis p/ loop
    var posfix;
    var handler;
    var method;
    var url;

    //faça um loop em todo o controllador ]
    for (var key in obj) {
      //objetos reservados
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      //exportando as rotas
      switch (key) {
        //caso a variavel key contenha a string "show"
        case 'show':
        //então salve o method com a string "get"
          method = 'get';
          // e adicione '/' + name + '/:' + name + '_id
          url = '/' + name + '/:' + name + '_id';
          //break para finalizar o switch
          break;
          //e assim por diante
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
        //caso nenhuma das opções do switch baterem com a key, então gere um erro
          throw new Error('Rota Desconhecida: ' + name + '.' + key);
      }

      //handle irá salvar especificamente um objeto dentro do arquivo, exemplo
      //dentro de /controllers/user/index.js temos exportando o objeto "show"
      //esse objeto que sera salvo aqui
      handler = obj[key];
      //verifica se o arquivo requerido possui o objeto posfix definido, se não,
      //retorna uma string vazia.
      posfix = obj[key].posfix || ''
      //sem else aqui

      //se o objeto for definido como index, trate a url da seguinte forma
      if(key != 'index') url =  url + '/' + posfix
      //Se não, a url terá esse outro formato, esse foi um hotfix
      if(key == 'index') url = prefix + "/" + name + "/"  + posfix
      //middleware para nomear os controlladores e exporta-los em req.scope
      //vou ver de tirar isso daqui pelo amor de deus que ideia de girico
      app[method](url, require('./resourceNameHandle')(name, key));
      
      //da pra refatorar isso daqui
      //adiciona suporte aos middlewares, se o objeto before existir, é adicionado no fluxo
      //assim que é requisitada pelo usuario
      if (obj.before) {
        app[method](url, obj.before, handler);
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
      } 
      // a mesma coisa aqui porem o before fica salvo dentro do objeto [key]
      //que por sua vez está salvo dentro de outro objeto (obj)
      if(obj[key].before){
        app[method](url, obj[key].before, handler)
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
      } 
      //se não existir mais befores, adicione o controllador a rota
      if (!obj[key].before && !obj.before) {
        app[method](url, handler);
        verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key);
      }

    }

    //adiciona as rotas inseridas em app no "server", que é inserido na função
    //representando o servidor principal
    server.use('/api', app);
  });
};