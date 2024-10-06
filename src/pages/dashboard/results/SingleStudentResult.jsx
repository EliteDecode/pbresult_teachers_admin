import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";
import teachersImg from "../../../assets/icons/teachers-day.png";
import SingleStudentResultDetails from "@/components/dashboard/SingleStudentResultDetails";
import EditStudentResultForm from "@/components/Forms/EditStudentResultsForm";
import GoBackBtn from "@/components/dashboard/GoBackBtn";
import {
  getStudentResult,
  getTermGradingById,
} from "@/features/grade/gradeSlice";

// Custom hook for managing single student result data
const useSingleStudentResult = () => {
  const dispatch = useDispatch();
  const { termId, studentId, subjectId } = useParams();
  const { isLoading, singleStudentResult } = useSelector(
    (state) => state.grade
  );
  const { singleTerm } = useSelector((state) => state.calender);

  useEffect(() => {
    if (singleTerm) {
      dispatch(getStudentResult({ termId, studentId, subjectId }));
      dispatch(getTermGradingById(singleTerm.data.term_grading.id));
    }
  }, [dispatch, termId, studentId, subjectId, singleTerm]);

  return { isLoading, singleStudentResult };
};

// SingleStudentResult component
const SingleStudentResult = () => {
  const { isLoading, singleStudentResult } = useSingleStudentResult();

  return (
    <Box>
      <Box className="bg-white flex justify-between my-3 rounded-md p-1.5 w-full py-5">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography className="text-primary text-[15px] font-bold">
              Overview of Students Result
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              {singleStudentResult?.data?.subject?.name} Result
            </Typography>
          </Box>
        </Box>
      </Box>
      <GoBackBtn />

      {isLoading ? (
        <Loader />
      ) : singleStudentResult ? (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <SingleStudentResultDetails
                singleStudentResult={singleStudentResult}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <EditStudentResultForm />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Error />
      )}
    </Box>
  );
};

export default SingleStudentResult;
