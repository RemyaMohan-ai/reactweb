
import User from "../model/usermodel.js";
import { errorhandler } from "../utils/errorhandler.js";
import bcryptjs from 'bcryptjs'

export const testapi = async(req,res)=>{
    res.json({
       message: "test api working successfully"
    })
}

export const updateUser = async(req,res,next) => {
    // if(req.user.id !== req.params.id){
    //  return next(errorhandler(401,'you can update only your account'));
    // }
    try {
        console.log("reciecing updatong data",req.body);
        
       if(req.body.password){
        req.body.password =  bcryptjs.hashSync(req.body.password,10)
       } 
       const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
           $set:{
            userName:req.body.username,
            email:req.body.email,
            password:req.body.password,
            profilePicture:req.body.profilePicture,

           } 
        },
        {new:true}
       );
       const {password,...rest} = updatedUser._doc
       res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req,res,next) =>{
    // if(req.user.id !== req.params.id){
    //     return next (errorhandler(401,'you can delete only your account'))
    // }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User deleted')
    } catch (error) {
        next(error)
    }
}