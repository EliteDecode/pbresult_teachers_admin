import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Box, Grid } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleStudent,
  getStudents,
} from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import SingleStudentDetails from "@/components/dashboard/SingleStudentDetails";
import { getSessions, getTerms } from "@/features/calender/calenderSlice";
import SingleStudentHeader from "@/components/dashboard/SingleStudentHeader";
const SingleStudent = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { isLoading, singleStudent } = useSelector((state) => state.student);
  const { terms } = useSelector((state) => state.calender);
  useEffect(() => {
    dispatch(getSingleStudent(studentId));
    dispatch(getSessions());
  }, []);

  return (
    <Box>
      <SingleStudentHeader
        studentId={singleStudent?.data?.id}
        classId={singleStudent?.data?.classroom?.classroom_id}
        terms={terms}
      />
      <Box role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/students"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Students
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Single Student
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        {isLoading ? (
          <Loader />
        ) : (
          <SingleStudentDetails singleStudent={singleStudent} />
        )}
      </Box>
    </Box>
  );
};

export default SingleStudent;
