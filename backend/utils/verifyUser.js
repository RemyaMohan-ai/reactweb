import jwt from 'jsonwebtoken'
import { errorhandler } from './errorhandler.js';

export const verifyToken = (req,res,next) =>{
    console.log('cookies=',req.cookies);
    console.log('body=',req.body);
    
    const token = req.cookies.access_token ;
    // const token = req.cookies

    console.log("Received token:", token);

    if(!token) return next(errorhandler(401,'You are not authenticated'))

        jwt.verify(token,process.env.JWT_SECRET,(err , user) =>{
            if(err) return next(errorhandler(403,'token not valid'))

                req.user = user;
                next();
        })
}