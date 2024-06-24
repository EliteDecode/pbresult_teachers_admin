import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import teachersImg from "../../../assets/icons/teachers-day.png";
import { useParams } from "react-router-dom";
import {
  getStudentResult,
  getTermGradingById,
} from "@/features/grade/gradeSlice";
import { Typography } from "antd";
import SingleStudentResultDetails from "@/components/dashboard/SingleStudentResultDetails";
import EditStudentResultForm from "@/components/Forms/EditStudentResultsForm";
const SingleStudentResult = () => {
  const dispatch = useDispatch();
  const { isLoading, singleStudentResult } = useSelector(
    (state) => state.grade
  );
  const { termId, studentId, subjectId } = useParams();
  useEffect(() => {
    dispatch(getStudentResult({ termId, studentId, subjectId }));
    dispatch(getTermGradingById(termId));
  }, []);

  return (
    <Box>
      <Box className="bg-white flex justify-between my-3 rounded-md p-1.5  w-full py-5">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of Students Result
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              {singleStudentResult?.data?.subject?.name} Result
            </Typography>
          </Box>
        </Box>
      </Box>

      {isLoading && !singleStudentResult ? (
        <Loader />
      ) : (
        <>
          {singleStudentResult ? (
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
            <>
              {" "}
              <Error />{" "}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SingleStudentResult;
