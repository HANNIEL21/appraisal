// adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lecturers: [],
    aprasials: [],
    admins: [],
    isLoading: true,
    error: null,
};

export const dashboardSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearState: (state) => {
            state.lecturers = [];
            state.aprasials = [];
            state.admins = [];
            state.isLoading = false;
            state.error = null;
        },
        setLecturers: (state, { payload }) => {
            state.lecturers = payload;
        },
        setAprasials: (state, { payload }) => {
            state.aprasials = payload;
        },
        setAdmins: (state, { payload }) => {
            state.admins = payload;
        },
        isLoadingTrue: (state) => {
            state.isLoading = true;
        },
        isLoadingFalse: (state) => {
            state.isLoading = false;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLecturers,
    setAprasials,
    setAdmins,
    clearState,
    isLoadingTrue,
    isLoadingFalse,
    setError,
    clearError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
