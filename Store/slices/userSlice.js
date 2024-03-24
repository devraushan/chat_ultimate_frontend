import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const IP = process.env.NEXT_PUBLIC_IP
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendProtocol = process.env.NEXT_PUBLIC_PROTOCOL

export const fetchUser = createAsyncThunk("fetchUser", async (data) => {
    const {userName,password} = data
    const response = await fetch(`${backendProtocol}://${IP}:${backendPort}/auth/login`, {
        method: "POST",
        body: JSON.stringify({userName,password}),
        headers: {"Content-Type":"application/json"}
    })
    return response.json()
})

const userSlice = createSlice({
    name: "userdata",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    reducers:{
        clearToken: (state,action)=>{
            state.data="";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.isError = false
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            console.log(action)
        })
    }
})
export const {clearToken} = userSlice.actions
export default userSlice.reducer