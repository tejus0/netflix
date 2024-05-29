import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser= createAsyncThunk(
    'user/loginuser',
    async(userCredentials)=>{
        // const request = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`)
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:null,
        error:null
    }
})

export default userSlice.reducer;