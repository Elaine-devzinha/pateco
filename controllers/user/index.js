'use strict'

/**
 * Module dependencies.
 */
let db = require('../../models')


exports.show = async function(req, res, next){
  console.log(req)
  res.send(
    {
      message:"success",
      data:await db.usuario.findOne({where: {id:req.params['user_id']}})
    }
  )
};
