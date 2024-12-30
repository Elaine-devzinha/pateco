
let db = require('../../models')
let Protected = require('../../middlewares/authentication')
let permissao = db.permissao

exports.before = (req,res,next) => { Protected(req,res,next) }

exports.create = async function(req,res){
    
  permissao.create( req.body ).then((scc) => {
      res.status(201).json( scc )
    }).catch((sequelize) => {
      res.status(403).json(sequelize.message || sequelize.errors)
    })
}

exports.show = async function(req,res){
    const { permission_id } = req.params
    var result = await permissao.findOne({where:{
        id:permission_id
        }})
    if(result){
        res.json(result)
    }else{
        res.sendStatus(404)
    }
}

exports.list = async function(req,res){
    res.json(await permissao.findAll())
}

exports.update = async function(req,res){
    const { permission_id } = req.params
    var result = await permissao.findOne({where:{
        id:permission_id
        }})
    if(result){
        await result.update(req.body)
        res.json(result)
    }else{
        res.sendStatus(404)
    }
}

exports.delete = async function(req,res){
    const { permission_id } = req.params
    var result = await permissao.findOne({where:{
        id:permission_id
        }})
    if(result){
        await result.destroy()
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
}