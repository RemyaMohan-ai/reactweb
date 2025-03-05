import { createSlice } from "@reduxjs/toolkit";
import Signin from "../../pages/Signin";
import { act } from "react";

const initialState ={
    currentUser : null,
    loading : false, 
    error : false
};

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers :{
        SignInStart : (state) =>{
            state.loading = true;
        },

        SignInSuccess :(state, action) =>{
            state.currentUser = action.payload;
            state.loading = false; 
             state.error = false;
        },

        signInFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
})
export const{signInFailure, SignInStart,SignInSuccess} = userSlice.actions;
export default  userSlice.reducer