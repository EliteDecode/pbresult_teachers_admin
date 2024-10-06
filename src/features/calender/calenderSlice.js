import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import calenderservice from "./calenderService";
import { createAsyncThunkWithHandler } from "../api";

const terms = JSON.parse(localStorage.getItem("pbTeacherAdminTerms"));
const singleTerm = JSON.parse(localStorage.getItem("pbTeacherSingleAdminTerm"));

const initialState = {
  sessions: null,
  singleSession: null,
  terms: terms ? terms : null,
  singleTerm: singleTerm ? singleTerm : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getSessions = createAsyncThunkWithHandler(
  "calender/getSessions",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.getSessions(token);
  }
);

export const getSessionById = createAsyncThunkWithHandler(
  "calender/getSessionById",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.getSessionById(token, id);
  }
);

export const addSession = createAsyncThunkWithHandler(
  "calender/addSession",
  async (calendersData, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.addSession(token, calendersData);
  }
);

export const updateSession = createAsyncThunkWithHandler(
  "calender/updateSession",
  async (calendersData, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.updateSession(token, calendersData);
  }
);

export const getTerms = createAsyncThunkWithHandler(
  "calender/getTerms",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.getTerms(token);
  }
);

export const getTermById = createAsyncThunkWithHandler(
  "calender/getTermById",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.getTermById(token, id);
  }
);

export const addTerm = createAsyncThunkWithHandler(
  "calender/addTerm",
  async (calendersData, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.addTerm(token, calendersData);
  }
);

export const updateTerm = createAsyncThunkWithHandler(
  "calender/updateTerm",
  async (calendersData, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await calenderservice.updateTerm(token, calendersData);
  }
);

const calenderSlice = createSlice({
  name: "calender",
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
      .addCase(addSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "session added successfully";
      })
      .addCase(addSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "session edited successfully";
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sessions = action.payload;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSessionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleSession = action.payload;
      })
      .addCase(getSessionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(addTerm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTerm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "term added successfully";
      })
      .addCase(addTerm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateTerm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTerm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "term edited successfully";
      })
      .addCase(updateTerm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getTerms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTerms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.terms = action.payload;
      })
      .addCase(getTerms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getTermById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTermById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleTerm = action.payload;
      })
      .addCase(getTermById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = calenderSlice.actions;
export default calenderSlice.reducer;
