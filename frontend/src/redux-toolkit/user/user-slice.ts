import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthErrors, LoadingStatus, UserResponse, UserEditErrors } from "../../types/types";
import {
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateUserInfo,
} from "./user-thunks";

export interface UserState {
    user?: UserResponse;
    loadingState: LoadingStatus;
    successMessage: string;
    userEditErrors: Partial<UserEditErrors>;
}

export const initialState: UserState = {
    user: undefined,
    loadingState: LoadingStatus.LOADING,
    successMessage: "",
    userEditErrors: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserResponse>) {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        resetInputForm(state) {
            state.successMessage = "";
            state.userEditErrors = {};
        },
        logoutSuccess(state) {
            state.user = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.userEditErrors = {};
        });
        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.userEditErrors = action.payload!;
        });
        builder.addCase(fetchUserInfoByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchUserInfoByQuery.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { setUser, resetInputForm, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
