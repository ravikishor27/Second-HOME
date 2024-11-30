import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
};
console.log('user loaded')

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.loading = true;
            console.log('setUser called');
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInfailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {signInStart, signInSuccess,signInfailure} = userSlice.actions;

export default userSlice.reducer;