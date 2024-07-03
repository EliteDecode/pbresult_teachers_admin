import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import ResultHeader from "@/components/dashboard/ResultHeader";
import { getTerms } from "@/features/calender/calenderSlice";
import StudentPerCourseTables from "@/components/Tables/StudentPerCourseTables";
import SubjectTables from "@/components/Tables/SubjectTables";
import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
const StudentResult = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms } = useSelector((state) => state.calender);

  const termId = terms?.data?.find(
    (term) => term?.active == "1" && term?.current == "1"
  )?.id;

  useEffect(() => {
    dispatch(
      getAllStudentResultPerClass({ classId: user?.classroom?.id, termId })
    );
  }, []);

  return (
    <Box>
      <ResultHeader />
      <Box className="mt-5">
        {isLoading ? (
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
