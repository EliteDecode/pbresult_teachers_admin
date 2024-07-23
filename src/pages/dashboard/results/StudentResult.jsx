import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import ResultHeader from "@/components/dashboard/ResultHeader";
import { getTermById, getTerms } from "@/features/calender/calenderSlice";
import StudentPerCourseTables from "@/components/Tables/StudentPerCourseTables";
import SubjectTables from "@/components/Tables/SubjectTables";
import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
const StudentResult = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms, isLoading: loadingTerm } = useSelector(
    (state) => state.calender
  );

  useEffect(() => {
    dispatch(getTerms());
    if (terms) {
      const termId = terms?.data?.find(
        (term) => term?.active === "1" && term?.current === "1"
      )?.id;

      if (termId) {
        dispatch(getTermById(termId));
        dispatch(getAllStudentResultPerClass({ classId: user?.classroom?.id }));
      }
    }
  }, []);

  return (
    <Box>
      <ResultHeader />
      <Box className="mt-5">
        {isLoading || loadingTerm ? (
          <Loader />
        ) : (
          <Box className="overflow-x-scroll  bg-white">
            <SubjectTables />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StudentResult;
