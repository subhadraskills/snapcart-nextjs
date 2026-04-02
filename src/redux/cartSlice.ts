import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Calculator } from "lucide-react";
import mongoose from "mongoose";





   interface IGrocery{
       _id:mongoose.Types.ObjectId,
       name:string,
       category:string,
       price:string,
       unit:string,
       quantity:number,
       image:string,
       createdAt?:Date,
       updateAt?:Date
   
   }

   interface ICartslice{
    cartData:IGrocery[] ,
    subTotal:number,
    deliveryFee:number,
    finalTotal:number
   
}

const initialState:ICartslice={
    cartData:[],
    subTotal:0,
    deliveryFee:40,
    finalTotal:40

   
}


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<IGrocery>)=>{
            state.cartData.push(action.payload)
            cartSlice.caseReducers.CalculateTotals(state)

        },
        increaseQuantity:(state,action:PayloadAction<mongoose.Types.ObjectId>)=>{
            const item=state.cartData.find(i=>i._id==action.payload)
            if(item){
                item.quantity=item.quantity + 1

            }
             cartSlice.caseReducers.CalculateTotals(state)

        },
        decreaseQuantity:(state,action:PayloadAction<mongoose.Types.ObjectId>)=>{
             const item=state.cartData.find(i=>i._id==action.payload)
             if(item?.quantity && item.quantity>1){
                item.quantity=item.quantity-1
             }
             else{
                state.cartData=state.cartData.filter(i=>i._id!==action.payload)
             }
              cartSlice.caseReducers.CalculateTotals(state)

        },
        removeFormCart:(state,action:PayloadAction<mongoose.Types.ObjectId>)=>{
             state.cartData=state.cartData.filter(i=>i._id!==action.payload)
              cartSlice.caseReducers.CalculateTotals(state)

        },
        CalculateTotals:(state)=>{
            state.subTotal=state.cartData.reduce((sum,item)=>sum + Number(item.price)*item.quantity, 0)
            state.deliveryFee=state.subTotal>100?0:40
            state.finalTotal=state.subTotal +state.deliveryFee
        }
       
    }
})

        
export const{addToCart,increaseQuantity, decreaseQuantity,  removeFormCart}=cartSlice.actions
export default cartSlice.reducer