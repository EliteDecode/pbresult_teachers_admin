import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { createAsyncThunkWithHandler } from "../api";

const user = JSON.parse(localStorage.getItem("pbSchoolTeacherUser"));
const token = JSON.parse(localStorage.getItem("pbSchoolTeacherUserToken"));

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunkWithHandler(
  "auth/login",
  async (user, thunkAPI) => {
    return await authService.login(user);
  }
);

export const getUserDetails = createAsyncThunkWithHandler(
  "auth/getUserDetails",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await authService.getUserDetails(token);
  }
);

export const changePassword = createAsyncThunkWithHandler(
  "auth/changePassword",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await authService.changePassword(data, token);
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.token = action.payload.token;
        state.isSuccess = true;
        state.message = "login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Password changed successfully";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
