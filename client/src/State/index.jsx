import { createSlice } from "@reduxjs/toolkit";


const initialState = 
{
  
   user:null,
   token:null,
}

 const authSlice = createSlice({

name:"auth",
initialState,
reducers:{

    

    setLogin:(state,action)=>
    {
      
        state.user  = action.payload.user
        state.token = action.payload.token

    },
    setLogout:(state,action)=>
    {

        state.user = initialState.user
        state.token= initialState.token
    }
}


});

export const {setMode,setLogin,setLogout} = authSlice.actions;

const authReducer = authSlice.reducer

export default authReducer;


