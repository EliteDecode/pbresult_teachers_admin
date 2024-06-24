import BroadsheetTable from "@/components/Tables/BroadsheetTable.jsx";
import { Button } from "@/components/ui/button";
import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
import { getStudents } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { Box } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePDF } from "react-to-pdf";

const ResultBroadsheet = () => {
  const { resultsPerTermClass } = useSelector((state) => state.grade);
  const { students, isLoading } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms } = useSelector((state) => state.calender);

  const termId = terms?.data?.find(
    (term) => term?.active == "1" && term?.current == "1"
  )?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
    dispatch(
      getAllStudentResultPerClass({ classId: user?.classroom?.id, termId })
    );
  }, []);

  return (
    <Box className="#fafafa">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box className="w-[90%] m-auto relative my-5">
            <Box className="absolute top-0 left-0">
              <img
                src={user?.school?.picture}
                alt="school logo"
                className="w-[12%] border bg-white p-3 rounded-md "
              />
            </Box>
            <Box className="text-center py-5">
              <Typography className="font-black text-[20px]">
                {user?.school?.name}
              </Typography>
              <Typography className=" text-[16px]">
                Class:{" "}
                <span className="font-bold">{user?.classroom?.name}</span>
              </Typography>
              <Typography className=" text-[16px]">
                Total Student:{" "}
                <span className="font-bold">{students?.data?.length}</span>
              </Typography>
              <Typography className=" text-[16px]">
                Result Availaable:{" "}
                <span className="font-bold">
                  {" "}
                  {resultsPerTermClass?.data?.student_results?.length}
                </span>
              </Typography>
              <Typography className=" text-[16px]">
                Class Teacher:{" "}
                <span className="font-bold">
                  {user?.firstname} {user?.lastname}
                </span>
              </Typography>
            </Box>
            <Box className="overflow-x-scroll bg-white">
              <BroadsheetTable classroom={user?.classroom?.name} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResultBroadsheet;
