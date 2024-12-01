'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usuario = db.usuario

exports.prefix = "/auth"

exports.index = async function(req, res){
  const { email, password } = req.headers
  var token;
  if(email && password){
    var result = await usuario.findOne({where:{ct_email:email}})
      console.log(result)

    var checkPassword = await bcrypt.compare(password, result.pw_usuario)
    if(checkPassword){
      token = await jwt.sign({ userId: result.id }, 'your-secret-key', {
        expiresIn: '1h',
      });
      res.send({
        message:"Success loggin",
        token
      });
    }
    else{
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(403)
  }
};


