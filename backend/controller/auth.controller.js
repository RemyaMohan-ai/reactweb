import bcryptjs from 'bcryptjs'
import User from '../model/usermodel.js';

export const signup = async(req,res,next)=>{
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