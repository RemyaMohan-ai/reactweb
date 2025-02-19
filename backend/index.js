
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log("connectedd to db");   
}).catch((err)=>{
    console.log("error in db",err);
})

const app = express()

app.listen(3000, () => {
    console.log('server listening on port 300');
    
})