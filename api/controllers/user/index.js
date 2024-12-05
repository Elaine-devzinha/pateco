'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')
let Protected = require('../../middlewares/authentication')
const bcrypt = require('bcrypt')
let usuario = db.usuario

exports.create = async function(req,res){
  var hashedPassword;
  if(req.body.pw_usuario){
    hashedPassword = await bcrypt.hash(req.body.pw_usuario, 12);
    req.body.pw_usuario = hashedPassword
  }
    usuario.create( req.body ).then((scc) => {
      res.status(200).send( scc )
    }).catch((sequelize) => {
      res.status(403).send(sequelize.errors)
    })

  }


exports.list = async function(req,res, next){

  res.send(await usuario.findAll())
}

exports.show = async function(req,res){
  const { user_id } = req.params
  var result = await usuario.findOne({where:{
      id:user_id
    }})
  if(result){
    res.send(result)
  }else{
    res.sendStatus(404)
  }
}

exports.update = async function(req,res){
  const { user_id } = req.params
  var result = await usuario.findOne({where:{
      id:user_id
    }})
  if(result){
    if(req.body.pw_usuario){
      var hashedPassword = await bcrypt.hash(req.body.pw_usuario, 12);
      req.body.pw_usuario = hashedPassword
    }
    
    await result.update(req.body)
    res.send(result)
  }else{
    res.sendStatus(404)
  }
}

exports.list.before = (req,res,next) => Protected(req,res,next)
