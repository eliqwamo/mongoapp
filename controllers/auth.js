import jwt from 'jsonwebtoken';
import asynchandler from 'express-async-handler';
import Account from '../models/Account.js';

const protect = asynchandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = await Account.findById(decoded.dataToToken._id);
            next();
        } catch (error) {
            return res.status(401).json({message: error.message})
        }
    } else {
        return res.status(401).json({message: 'Forbidden'})
    }
})

export default protect;