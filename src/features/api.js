import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_URL = "https://pbresult.purplebeetech.com/api";

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
      return handleAsyncError(error, thunkAPI);
    }
  });
