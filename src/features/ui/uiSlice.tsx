import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    showSearchBox : false,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setShowSearchBox: (state, action) => {
            state.showSearchBox = action.payload;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;