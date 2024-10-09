import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
axios.defaults.withCredentials = true;
const initialState={
    loading:false,
    isAuthenticated:false,
    user:null,
    error:null,
}
export const register=createAsyncThunk('auth/register', async(formData, thunkAPI)=>{
    try{
        const response=await axios.post('http://localhost:9000/api/v1/register', formData);
        return response;
    }catch(error){
        console.log(error.response.data.message);
        return  thunkAPI.rejectWithValue(error.response.data);
    }
})
export const login=createAsyncThunk('auth/login', async(formData, thunkAPI)=>{
    try{
        const response=await axios.post('http://localhost:9000/api/v1/login', formData);
        return response;
    }catch(error){
        console.log(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const logout=createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
    try{
        const response=await axios.post('http://localhost:9000/api/v1/logout');
        return response;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const verifyEmail=createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
    try{
        const response=await axios.post('http://localhost:9000/api/v1/verify-email');
        return response;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const forgotPass=createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
    try{
        const response=await axios.post('http://localhost:9000/api/v1/logout');
        return response;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const loadProf=createAsyncThunk('auth/profile', async(_, thunkAPI)=>{
    try{
        const response=await axios.get('http://localhost:9000/api/v1/profile');
        return response;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        clear : (state) =>{
            state.user=null
            state.error=null
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending, (state)=>{
            state.loading=true;
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
        })
        .addCase(register.rejected, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
        })
        .addCase(login.pending, (state)=>{
            state.loading=true;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
        })
        .addCase(login.rejected, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
        })
        .addCase(logout.pending, (state)=>{
            state.loading=true;
        })
        .addCase(logout.fulfilled, (state, action)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.loading=false;
        })
        .addCase(loadProf.pending, (state)=>{
            state.loading=true;
        })
        .addCase(loadProf.fulfilled, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
        })
        .addCase(loadProf.rejected, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
        })
        .addCase(verifyEmail.pending, (state, action)=>{
            state.loading=true;
        })
        .addCase(verifyEmail.fulfilled, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
        })
        .addCase(loadProf.rejected, (state, action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
        })
    }
})
export const {clear} = authSlice.actions;
export default authSlice.reducer;