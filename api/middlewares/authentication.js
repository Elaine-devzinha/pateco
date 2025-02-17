    'use strict'

    const jwt = require('jsonwebtoken');
    
    
    module.exports = function (req, res, next) {
    let token = req.headers.authorization.replace(/^Bearer\s*/i, "")

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, 'abracadabra');
        req.id = decoded.id;
        req.role = decoded.role;

        next()
    } catch (error) {
        res.status(401).json({ error,message: 'Invalid token' });
    }
 };
