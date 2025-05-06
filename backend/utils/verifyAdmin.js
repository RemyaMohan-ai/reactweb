import { errorhandler } from "./errorhandler.js";

export const verifyAdmin = async(req,res, next)=>{

    console.log("User Data:", req.user); 
    
    if(!req.user) return next(errorhandler(401,'User not authenticated'))
        if(!req.user.isAdmin)
            return next(errorhandler(403,'Access denied!'));

    next();
} ;     