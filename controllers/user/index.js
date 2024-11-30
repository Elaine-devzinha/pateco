'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')
const bcrypt = require('bcrypt')
let usuario = db.usuario

exports.create = async function(req,res){
  var hashedPassword;
  const {nome, nascimento, email, password} = req.body;
  if(password){
    hashedPassword = await bcrypt.hash(password, 12)
  }
    usuario.create({
      nm_usuario:nome,
      dt_usuario:nascimento,
      ct_email:email,
      pw_usuario:hashedPassword
    }).then((scc) => {
      res.status(200).send(scc)
    }).catch((sequelize) => {
      res.status(403).send(sequelize.errors)
    })

  }



