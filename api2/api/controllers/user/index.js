'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')


const bcrypt = require('bcrypt')
let usuario = db.usuario

exports.before = [
  require('../../middlewares/authentication'),
  require('../../middlewares/authorization')
]


exports.index = async function(req,res){
  var result = await usuario.scope(['incluirGrupos','excluirSenha']).findOne({where:{
      id:req.id
    }})
  if(result){
    res.json(result)
  }else{
    res.sendStatus(404)
  }
}


exports.list = async function(req,res){
  res.json(await usuario.scope('incluirGrupos', 'excluirSenha').findAll())
}
exports.create = async function(req,res){
  var hashedPassword;
  if(req.body.pw_usuario){
    hashedPassword = await bcrypt.hash(req.body.pw_usuario, 12);
    req.body.pw_usuario = hashedPassword
  }
    usuario.create( req.body ).then((scc) => {
      res.status(201).json( scc )
    }).catch((sequelize) => {
      res.status(403).json(sequelize.message || sequelize.errors)
    })

}
exports.show = async function(req,res){
  const { user_id } = req.params
  var result = await usuario.scope(['incluirGrupos','excluirSenha']).findOne({where:{
      id:user_id
    }})
  if(result){
    res.json(result)
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
    res.json(result)
  }else{
    res.sendStatus(404)
  }
}
exports.delete = async function(req,res){
  
  const { user_id } = req.params
  var result = await usuario.findOne({where:{
      id:user_id
    }})
  if(result){
    await result.destroy()
    res.sendStatus(204)
  }else{
    res.sendStatus(404)
  }
}



