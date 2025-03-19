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
     console.log("Generated Token:", token);

      const { password : hashedPassword ,...rest} =validUser._doc
   //   res.cookie("access_token",token,{httpOnly : true ,  maxAge: 24 * 60 * 60 * 1000,}).status(200).json(rest)
   const expiryDate = new Date(Date.now() + 3600000)
    res
    .cookie("access_token", token, { 
      httpOnly: true,
       expires: expiryDate })
      .status(200)
      .json(rest)
   } catch (error) {
      next(error)
   }
}

export const google = async(req,res,next)=>{
   try {
      const user = await User.findOne({email: req.body.email })
      if(user){
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
         console.log("Generated Token:", token);

         const{password : hashedPassword ,...rest} =user._doc
         // res.cookie("access_token",token,{httpOnly : true ,  maxAge: 24 * 60 * 60 * 1000,}).status(200).json(rest)
         const expiryDate = new Date(Date.now() + 3600000)
         res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
         .status(200).json(rest);
      }else{
         const generatedPassword = Math.random().toString(36).slice(-8);
         const hashedPassword = await bcryptjs.hashSync(generatedPassword, 10);
         const newUser = new User({
            userName: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 1000).toString(),
            email: req.body.email,
            password : hashedPassword,
            profilePicture : req.body.photo
         })
         await newUser.save()
         const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET);
         const{password : hashedPassword2 ,...rest} =newUser._doc
         // return res.cookie("access_token",token,{httpOnly : true ,  maxAge: 24 * 60 * 60 * 1000,}).status(200).json(rest)
         const expiryDate = new Date(Date.now() + 3600000)
         res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
         .status(200).json(rest);
      
      }
   } catch (error) {
      next(error)
   }
}