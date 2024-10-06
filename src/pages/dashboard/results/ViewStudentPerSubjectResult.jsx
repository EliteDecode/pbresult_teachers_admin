import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import ResultHeader from "@/components/dashboard/ResultHeader";
import { getTerms } from "@/features/calender/calenderSlice";
import StudentPerCourseTables from "@/components/Tables/StudentPerCourseTables";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStudentResultPerClassPerSubject } from "@/features/grade/gradeSlice";
import { Button } from "@/components/ui/button";
import GoBackBtn from "@/components/dashboard/GoBackBtn";

const ViewStudentPerSubjectResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.grade);
  const { termId, classId, subjectId } = useParams();

  useEffect(() => {
    dispatch(
      getAllStudentResultPerClassPerSubject({
        classroomId: classId,
        termId: termId,
        subjectId: subjectId,
      })
    );
  }, []);

  return (
    <Box>
      <ResultHeader />
      <GoBackBtn />
      <Box className="mt-5">
        {isLoading ? (
          <Loader />
        ) : (
          <Box className="overflow-x-scroll  bg-white">
            <StudentPerCourseTables />
            <Button size="sm" className="m-3" onClick={() => navigate(-1)}>
              Return
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ViewStudentPerSubjectResult;
