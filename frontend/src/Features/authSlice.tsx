import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" as any
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user: any, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8000/login', {
            email: user.email,
            password: user.password
        })
        return response.data
    } catch (error: any) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const Me = createAsyncThunk("user/Me", async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:8000/me')
        return response.data
    } catch (error: any) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const Logout = createAsyncThunk("user/Logout", async () => {
    await axios.delete('http://localhost:8000/logout')
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(Me.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(Me.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(Me.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export default authSlice.reducer
export const {reset} = authSlice.actions