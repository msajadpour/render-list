import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    initialData: {
        symbolsName:[] , 
        trade: [],
        bidasks:[]
    },
}

export const dataSlice = createSlice({
    name: "dataStore",
    initialState,
    reducers: {
        setInitialData: (state, action) => {
            state.initialData = action.payload;
        },
    }
})

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;