import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    message: null,
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.status = true;
            state.message = action.payload;
        },
        clearError: (state) => {
            state.message = null;
            state.status = false;
        },
    }
})

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;