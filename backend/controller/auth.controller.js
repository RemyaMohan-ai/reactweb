import bcryptjs from 'bcryptjs'
import User from '../model/usermodel.js';
import { errorhandler } from '../utils/errorhandler.js'
import jwt from 'jsonwebtoken'

export const signup = async(req,res,next)=>{
   console.log("req.body",req.body);
   
   const {userName , email, password} = req.body;
   const hashedPassword = await bcryptjs.hash(password,10)
   const newUser = new User({userName,email,password : hashedPassword}) 
   
   try {
      await newUser.save()
      res.status(200).json({"message":"user successfully added"})
   } catch (error) {
      next(error)
   }
}

export const signin = async(req,res,next)=>{
   const {email,password} = req.body;
   try {
      const validUser =await User.findOne({email})

      if(!validUser){
         return next(errorhandler(404 ,"user not found"))
      }
     const validPassword = bcryptjs.compareSync(password , validUser.password)
     if(!validPassword) return next(errorhandler(401,"invalid credentials"))
      const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
      const{password : hashedPassword ,...rest} =validUser._doc
     res.cookie("access_token",token,{httpOnly : true ,  maxAge: 24 * 60 * 60 * 1000,}).status(200).json(rest)
   } catch (error) {
      next(error)
   }
}