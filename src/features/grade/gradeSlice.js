import { createSlice } from "@reduxjs/toolkit";
import gradeService from "./gradeService";
import { createAsyncThunkWithHandler } from "../api";

const singleTermGradings = JSON.parse(
  localStorage.getItem("pbSchoolAdminSingleTermGrading")
);
const singleStudentResult = JSON.parse(
  localStorage.getItem("pbSchoolAdminSingleStudentResult")
);

const initialState = {
  singleTermGradings: null,
  singleStudentResult: null,
  singleStudentResultSheet: null,
  resultsPerTermSubjectClass: null,
  resultsPerTermClass: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getTermGradingById = createAsyncThunkWithHandler(
  "grade/getTermGradingById",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await gradeService.getTermGradingById(token, id);
  }
);

export const editStudentResult = createAsyncThunkWithHandler(
  "grade/editStudentResult",
  async (result, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await gradeService.editStudentResult(token, result);
  }
);

export const addStudentResult = createAsyncThunkWithHandler(
  "grade/addStudentResult",
  async (result, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await gradeService.addStudentResult(token, result);
  }
);

export const getAllStudentResultPerClassPerSubject =
  createAsyncThunkWithHandler(
    "grade/getAllStudentResultPerClassPerSubject",
    async (data, thunkAPI) => {
      const token = thunkAPI.getState().pbTeachersAuth.token;
      return await gradeService.getAllStudentResultPerClassPerSubject(
        token,
        data
      );
    }
  );

export const getAllStudentResultPerClass = createAsyncThunkWithHandler(
  "grade/getAllStudentResultPerClass",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await gradeService.getAllStudentResultPerClass(token, data);
  }
);
export const getStudentResult = createAsyncThunkWithHandler(
  "grade/getStudentResult",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await gradeService.getStudentResult(token, data);
  }
);

export const getSingleStudentResultSheet = createAsyncThunkWithHandler(
  "grade/getSingleStudentResultSheet",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await gradeService.getSingleStudentResultSheet(token, data);
  }
);

const gradeSlice = createSlice({
  name: "grade",
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
      .addCase(getTermGradingById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTermGradingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleTermGradings = action.payload;
      })
      .addCase(getTermGradingById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSingleStudentResultSheet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleStudentResultSheet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleStudentResultSheet = action.payload;
      })
      .addCase(getSingleStudentResultSheet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })

      .addCase(getStudentResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleStudentResult = action.payload;
      })
      .addCase(getStudentResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(addStudentResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudentResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "result added successfuly";
      })
      .addCase(addStudentResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(editStudentResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudentResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "result editted successfuly";
      })
      .addCase(editStudentResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getAllStudentResultPerClassPerSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllStudentResultPerClassPerSubject.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.resultsPerTermSubjectClass = action.payload;
        }
      )
      .addCase(
        getAllStudentResultPerClassPerSubject.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.isSuccess = false;
        }
      )
      .addCase(getAllStudentResultPerClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudentResultPerClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.resultsPerTermClass = action.payload;
      })
      .addCase(getAllStudentResultPerClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = gradeSlice.actions;
export default gradeSlice.reducer;
