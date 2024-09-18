import ResultHeader from "@/components/dashboard/ResultHeader";
import SubjectTables from "@/components/Tables/SubjectTables";
import { getUserDetails } from "@/features/auth/authSlice";
import { getTermById, getTerms } from "@/features/calender/calenderSlice";
import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
import { getStudents } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const StudentResult = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms, isLoading: loadingTerm } = useSelector(
    (state) => state.calender
  );

  useEffect(() => {
    dispatch(getTerms());
    dispatch(getStudents());
    dispatch(getUserDetails());

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
