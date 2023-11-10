import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthErrors, LoadingStatus } from "../../types/types";
import {
    login,
    registration,
} from "./auth-thunks";

export interface AuthState {
    email: string;
    isRegistered: boolean;
    loadingState: LoadingStatus;
    success: string;
    error: string;
    errors: Partial<AuthErrors>;
}

export const initialState: AuthState = {
    email: "",
    isRegistered: false,
    loadingState: LoadingStatus.LOADING,
    success: "",
    error: "",
    errors: {}
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
            state.errors = {};
        },
        resetAuthState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(registration.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(registration.fulfilled, (state) => {
            state.isRegistered = true;
            state.loadingState = LoadingStatus.LOADED;
            state.errors = {};
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { setAuthLoadingState, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
