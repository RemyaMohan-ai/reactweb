import { createSlice } from "@reduxjs/toolkit";

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
        },

        updateUserStart:(state) =>{
            state.loading = true;
        },

        updateUserSuccess:(state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },

        updateUserFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteUserStart:(state) =>{
            state.loading = true;
        },
        
       deleteUserSuccess:(state,action) => {
            state.currentUser =null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export const {signInFailure, SignInStart,SignInSuccess,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess} = userSlice.actions;
export default  userSlice.reducer