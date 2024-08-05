import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./auth/authService";
// export const API_URL = "https://pbresult.purplebeetech.com/api";
export const API_URL = "https://api.pbresultvault.com/api";

const handleAsyncError = (error, thunkAPI) => {
  const message =
    (error.response &&
      error.response.data &&
      (error.response.data.message || error.response.data.error)) ||
    error.message ||
    error.toString();

  return thunkAPI.rejectWithValue(message);
};

export const createAsyncThunkWithHandler = (name, thunkFunction) =>
  createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const result = await thunkFunction(arg, thunkAPI);
      if (result && result.status === false) {
        return thunkAPI.rejectWithValue(result.message);
      }
      return result;
    } catch (error) {
      if (error?.response?.status === 401) {
        logout();
      }
      return handleAsyncError(error, thunkAPI);
    }
  });
