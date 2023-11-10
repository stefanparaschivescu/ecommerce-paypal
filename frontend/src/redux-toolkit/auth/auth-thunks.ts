import { createAsyncThunk } from "@reduxjs/toolkit";
import { History, LocationState } from "history";

import { AuthErrors, UserResponse, UserData, UserRegistration } from "../../types/types";
import RequestService from "../../utils/request-service";
import { AUTH_LOGIN, REGISTRATION } from "../../constants/urlConstants";
import { ACCOUNT, LOGIN } from "../../constants/routeConstants";
import { setUser } from "../user/user-slice";

export const login = createAsyncThunk<
    UserResponse,
    { userData: UserData; history: History<LocationState> },
    { rejectValue: string }
>("auth/login", async ({ userData, history }, thunkApi) => {
    try {
        const response = await RequestService.post(AUTH_LOGIN, userData);
        localStorage.setItem("token", response.data.token);
        history.push(ACCOUNT);
        thunkApi.dispatch(setUser(response.data.user));
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const registration = createAsyncThunk<{}, UserRegistration, { rejectValue: AuthErrors }>(
    "auth/registration",
    async (userRegistrationData, thunkApi) => {
        try {
            await RequestService.post(REGISTRATION, userRegistrationData);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
