import { createSlice } from "@reduxjs/toolkit";


// Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            email: "",
            password: "",
        },
        user: null,
        isLoading: false,
        isError: false,
        message: "",
    },
    reducers: {
        setEmail: (state, action) => {
            state.auth.email = action.payload;
        },
        setPassword: (state, action) => {
            state.auth.password = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoadingTrue: (state) => {
            state.isLoading = true;
        },
        setLoadingFalse: (state) => {
            state.isLoading = false;
        },
        setError: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
        logout: (state) => {
            state.auth.email = "";
            state.auth.password = "";
            state.user = null;
            state.isLoading = false;
            state.isError = false;
            state.message = "Logged out successfully";
        }
    },
});

export const { setEmail, setPassword, setError, setLoadingFalse, setLoadingTrue, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
