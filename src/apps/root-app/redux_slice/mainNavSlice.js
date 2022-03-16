import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: 'responsive'
}

export const mainNavSlice =  createSlice({
    name : "mainNav",
    initialState,
    reducers: {
        navShowOption: (state, action) => {
            state.sidebarShow = action.payload;
        }
    }
});

export const {navShowOption} = mainNavSlice.actions;

export default mainNavSlice.reducer;