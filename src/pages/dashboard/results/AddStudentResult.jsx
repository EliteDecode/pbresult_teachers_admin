import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import SingleStudentResultHeader from "@/components/dashboard/ResultHeader";
import { getTermGradingById, reset } from "@/features/grade/gradeSlice";
import { getStudentsOfOfferedCourse } from "@/features/students/studentSlice";
import AddStudentResultsForm from "@/components/Forms/AddStudentResultsForm";
import { getTermById, getTerms } from "@/features/calender/calenderSlice";

const AddStudentResult = () => {
  const dispatch = useDispatch();
  const { termId, subjectId, classId } = useParams();

  const { isLoading: gradeLoading, isSuccess } = useSelector(
    (state) => state.grade
  );
  const {
    singleTerm,
    terms,
    isLoading: termLoading,
  } = useSelector((state) => state.calender);
  const { isLoading: studentLoading } = useSelector((state) => state.student);
  const [loading, setLoading] = useState(false);
  const [gradingFetched, setGradingFetched] = useState(false);

  useEffect(() => {
    dispatch(getTerms());
    setLoading(true);
    dispatch(
      getStudentsOfOfferedCourse({
        classroom_id: classId,
        term_id: termId,
        subject_id: subjectId,
      })
    );
  }, [dispatch, classId, termId, subjectId]);

  useEffect(() => {
    if (terms && terms.data) {
      const currentTerm = terms.data.find((term) => term.current === 1);
      if (currentTerm) {
        dispatch(getTermById(currentTerm.id));
      }
    }
  }, [terms, dispatch]);

  useEffect(() => {
    if (
      singleTerm &&
      singleTerm.data &&
      singleTerm.data.term_grading &&
      !gradingFetched
    ) {
      dispatch(getTermGradingById(singleTerm.data.term_grading.id));
      setGradingFetched(true);
    }

    if (isSuccess) {
      setLoading(false);
      dispatch(reset());
    }
  }, [isSuccess, dispatch, singleTerm, gradingFetched]);

  return (
    <Box>
      <SingleStudentResultHeader />
      <Box className="mt-5">
        {loading ? <Loader /> : <AddStudentResultsForm />}
      </Box>
    </Box>
  );
};

export default AddStudentResult;
