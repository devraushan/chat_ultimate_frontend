import { createSlice } from "@reduxjs/toolkit";

const initialState = { chats:[]}

const chatListSlide = createSlice({
    name: 'chatList',
    initialState,
    reducers:{
        populateChat(state,action){
            state.chats = action.payload
        },
        appendChat(state,action){
            state.chats.push(action.payload)
        }
    }
})

export const { populateChat,appendChat} = chatListSlide.actions
export default chatListSlide.reducer