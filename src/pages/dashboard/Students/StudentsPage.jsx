import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import { getStudents } from "@/features/students/studentSlice";
import StudentsTables from "@/components/Tables/StudentsTables";
import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
import StudentHeader from "@/components/dashboard/StudentHeader";
const StudentsPage = () => {
  const { isLoading } = useSelector((state) => state.student);
  const { terms } = useSelector((state) => state.calender);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <StudentHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="overflow-x-scroll  bg-white">
          <StudentsTables />
        </Box>
      )}
    </Box>
  );
};

export default StudentsPage;
