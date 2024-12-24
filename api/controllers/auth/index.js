'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.prefix = "/auth"

exports.index = async function(req, res){
  const { ct_email, pw_usuario } = req.headers
  var token;
  if(ct_email && pw_usuario){
    var result = await db.usuario.scope(['incluirSenha', 'incluirGrupos']).findOne({where:{ct_email}})

           

    if(result){
    var checkPassword = await bcrypt.compare(pw_usuario, result.pw_usuario)
      if(checkPassword){
        token = await jwt.sign({ id: result.id, scope:req.scope }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.json({
          message:"Success loggin",
          token
        });
      }
      else{
        res.sendStatus(401);
      }
    }else{
      res.sendStatus(404)
    }
    
  }else{
    res.sendStatus(403)
  }
};


  exports.index.posfix = "login"
