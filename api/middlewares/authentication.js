    const jwt = require('jsonwebtoken');
    const db = require('../models');
const { where } = require('sequelize');
    
    
    module.exports = function (req, res, next) {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    try {
        
        const decoded = jwt.verify(token, 'your-secret-key');
        req.id = decoded.id;
        req.scope = decoded.scope;
        
        next()
    } catch (error) {
        res.status(401).json({ error,message: 'Invalid token' });
    }
 };
