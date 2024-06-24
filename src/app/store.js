import authSlice from "@/features/auth/authSlice";
import calenderSlice from "@/features/calender/calenderSlice";
import gradeSlice from "@/features/grade/gradeSlice";
import studentSlice from "@/features/students/studentSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    pbTeachersAuth: authSlice,
    student: studentSlice,
    calender: calenderSlice,
    grade: gradeSlice,
  },
});
