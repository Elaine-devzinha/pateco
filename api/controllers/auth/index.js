'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.index = async function(req, res){
  const { ct_email, pw_usuario } = req.headers
  var token;
  if(ct_email && pw_usuario){
    var result = await db.usuario.scope(['incluirSenha', 'incluirGrupos']).findOne({where:{ct_email}})
    if(result){
      var checkPassword = await bcrypt.compare(pw_usuario, result.pw_usuario)
      if(checkPassword){
        token = await jwt.sign({ id: result.id, role: result.grupo.nm_grupo }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.json({
          message:"Success loggin",
          user_id:result.id,
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

exports.create = (req,res) => {return require('../user').create(req,res)}

exports.delete = async (req,res) => {
  var token = req.headers.authorization
  if(token){
    const decoded = jwt.verify(token, 'your-secret-key');
    let id = decoded.id;
    let role = decoded.role;

    token = await jwt.sign({ id, role }, 'your-secret-key', {
      expiresIn: '1s',
    });
    res.json({
      message:"Success loginout",
    });

  }
}

exports.index.posfix = "login"
exports.create.posfix = "register"

