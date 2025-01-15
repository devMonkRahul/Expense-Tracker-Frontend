import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    accessToken: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.accessToken = action.payload;
            state.error = null;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.error = action.payload;
        }
    }
});

export const { login, logout, setError } = authSlice.actions;

export default authSlice.reducer;