import { createSlice } from "@reduxjs/toolkit";
import mongoose from "mongoose";
import { User } from "next-auth";


interface IUser{
    _id?:mongoose.Types.ObjectId
    name:string
    email:string
    password?:string
    mobile?:String
    role:"user" | "deliveryBoy" | "admin"
    image?:string

}

interface IUserslice{
    userData:IUser | null,
   
}

const initialState:IUserslice={
    userData:null,
   
}


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload

        }
    }
})

export const{setUserData}=userSlice.actions
export default userSlice.reducer