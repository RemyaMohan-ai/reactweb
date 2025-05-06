
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log("connectedd to db");   
}).catch((err)=>{
    console.log("error in db",err);
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(cookieParser())

app.listen(3000, () => {
    console.log('server listening on port 300');
    
})
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/admin',adminRoute)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error"
   return  res.status(statusCode).json({
    success :false,
    error : message,
    statusCode
   })
})