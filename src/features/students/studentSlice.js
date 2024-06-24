import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentservice from "./studentService";
import { createAsyncThunkWithHandler } from "../api";

const students = JSON.parse(localStorage.getItem("pbSchoolTeachersStudents"));

const initialState = {
  students: null,
  studentsPerCourse: null,
  singleStudent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getStudents = createAsyncThunkWithHandler(
  "student/getStudents",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await studentservice.getStudents(token);
  }
);

export const getStudentsOfOfferedCourse = createAsyncThunkWithHandler(
  "student/getStudentsOfOfferedCourse",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await studentservice.getStudentsOfOfferedCourse(token, data);
  }
);

export const getSingleStudent = createAsyncThunkWithHandler(
  "student/getSingleStudent",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await studentservice.getSingleStudent(token, id);
  }
);

export const addStudent = createAsyncThunkWithHandler(
  "student/addStudent",
  async (studentsData, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await studentservice.addStudent(token, studentsData);
  }
);

export const updateStudent = createAsyncThunkWithHandler(
  "student/updateStudent",
  async (studentsData, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await studentservice.updateStudent(token, studentsData);
  }
);

export const deactivateStudent = createAsyncThunkWithHandler(
  "student/deactivateStudent",
  async (studentsId, thunkAPI) => {
    const token = thunkAPI.getState().pbTeachersAuth.token;
    return await studentservice.deactivateStudent(token, studentsId);
  }
);

const studentSlice = createSlice({
  name: "student",
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
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "student added successfully";
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "student edited successfully";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getStudentsOfOfferedCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentsOfOfferedCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.studentsPerCourse = action.payload;
      })
      .addCase(getStudentsOfOfferedCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSingleStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleStudent = action.payload;
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deactivateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactivateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "student deleted successfully";
        state.isSuccess = true;
      })
      .addCase(deactivateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
