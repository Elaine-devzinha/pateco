    const jwt = require('jsonwebtoken');
    const db = require('../models')
    
    
    module.exports = function (req, res, next) {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        if(!req.scope){

            db.usuario.findOne(
                {where:{id:req.userId},
                    include:[{
                        model:db.tipo
                    }]
                }
            )
            .then(scc => console.log(scc))
            .catch(err => console.error('error:'+err))
      
        }
        next();
    } catch (error) {
        res.status(401).json({ error,message: 'Invalid token' });
    }
 };
