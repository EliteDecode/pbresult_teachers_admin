import React, { useEffect } from "react";
import { Box } from "@mui/material";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import SingleStudentResultHeader from "@/components/dashboard/ResultHeader";
import { getTermGradingById } from "@/features/grade/gradeSlice";
import { getStudentsOfOfferedCourse } from "@/features/students/studentSlice";
import AddStudentResultsForm from "@/components/Forms/AddStudentResultsForm";
const AddStudentResult = () => {
  const dispatch = useDispatch();
  const { isLoading, singleTermGradings } = useSelector((state) => state.grade);
  const { singleTerm } = useSelector((state) => state.calender);
  const { studentsPerCourse, isLoading: loading } = useSelector(
    (state) => state.student
  );

  const { termId, subjectId, classId } = useParams();

  useEffect(() => {
    dispatch(getTermGradingById(singleTerm?.data?.term_grading?.id));
    dispatch(
      getStudentsOfOfferedCourse({
        classroom_id: classId,
        term_id: termId,
        subject_id: subjectId,
      })
    );
  }, []);

  return (
    <Box>
      <SingleStudentResultHeader />
      <Box className="mt-5">
        {(isLoading && !singleTermGradings) || loading ? (
          <Loader />
        ) : (
          <AddStudentResultsForm />
        )}
      </Box>
    </Box>
  );
};

export default AddStudentResult;
