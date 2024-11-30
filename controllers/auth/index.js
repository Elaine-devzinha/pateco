'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usuario = db.usuario

exports.prefix = "/auth"

exports.index = async function(req, res, next){
  const { email, password } = req.headers

  if(email && password){
    var result = await usuario.findOne({where:{ct_email:email}})
    var checkPassword = await bcrypt.compare(password, usuario.pw_usuario || '')
    if(checkPassword){
      res.send(200).send(result);
    }
    else{
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(403)
  }
};



