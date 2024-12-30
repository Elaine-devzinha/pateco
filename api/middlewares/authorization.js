const permissions = require('../lib/permissions')

module.exports = (req,res,next) => {
    //mudar role para grupo pos
    const role = req.role
    const scope = req.resource.split('.')[0] 
    const resource = req.resource.split('.')[1]

    //nao podi
    if(role && scope && resource) {
        let candoit = permissions[role][scope].indexOf(resource) != -1
        
        if(candoit) return next() 
        if(!candoit) return res.status(403).json({error: 'Access denied'}).end()
        
    }else{
        return res.status(401).json({error: 'Access denied'}).end()
    }

}