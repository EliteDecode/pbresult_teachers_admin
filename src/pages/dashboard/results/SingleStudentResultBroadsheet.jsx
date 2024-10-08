import SingleStudentResultBroadSheetDetails from "@/components/dashboard/SingleStudentResultBroadSheetDetails";
import { getSessions, getTerms } from "@/features/calender/calenderSlice";
import { getSingleStudentResultSheet } from "@/features/grade/gradeSlice";
import { getStudents } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";

const SingleStudentResultBroadsheet = () => {
  const { isLoading } = useSelector((state) => state.grade);
  const { studentId, sessionId, classId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTerms());
    dispatch(getSessions());
    dispatch(getSingleStudentResultSheet({ studentId, sessionId, classId }));
  }, []);

  return (
    <Box className="bg-[#ebebeb] py-5 h-screen">
      {isLoading ? <Loader /> : <SingleStudentResultBroadSheetDetails />}
    </Box>
  );
};

export default SingleStudentResultBroadsheet;
