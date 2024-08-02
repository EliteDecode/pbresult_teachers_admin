import { generateColumns, generateDataSource } from "@/lib/functions";
import { Box } from "@mui/material";
import { Table, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const SingleStudentResultBroadSheetDetails = () => {
  const { singleStudentResultSheet } = useSelector((state) => state.grade);
  const { students } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms, sessions } = useSelector((state) => state.calender);

  const columns = generateColumns(singleStudentResultSheet?.data?.subjects);
  const dataSource = generateDataSource(
    singleStudentResultSheet?.data?.subjects
  );

  const activeTerm = terms?.data?.find((term) => term.current === "1")?.name;
  const activeSession = sessions?.data?.find(
    (session) => session.current === "1"
  )?.name;
  const student = students?.data?.find(
    (student) => student.id == singleStudentResultSheet?.data?.student_id
  );

  return (
    <Box className="p-5 border-2 w-[90%] m-auto bg-white rounded-md shadow-md">
      <Box className=" my-5 relative">
        <Box>
          <img
            src={user?.school?.picture}
            alt="school picture"
            className="w-[10%] -top-5 absolute"
          />
        </Box>
        <Box className="text-center space-y-2">
          <Typography className="text-[25px] font-bold">
            {user?.school?.name?.toUpperCase()}
          </Typography>
          <Typography>
            TERMINAL REPORT FOR{" "}
            <span className="font-black uppercase underline ">
              {activeSession}
            </span>{" "}
            SESSION{" "}
          </Typography>
          <Typography>
            TERMINAL REPORT FOR{" "}
            <span className="font-black uppercase underline ">
              {activeTerm}
            </span>{" "}
            , ADMISSION NO{" "}
            <span className="font-black uppercase underline ">
              {student?.student_school_id}
            </span>
            , Class{" "}
            <span className="font-black uppercase underline ">
              {singleStudentResultSheet?.data?.classroom_name}
            </span>
          </Typography>
          <Typography>
            STUDENT'S NAME:{" "}
            <span className="font-black uppercase underline ">
              {student?.lastname} {student?.firstname} {student?.middlename}
            </span>
          </Typography>
          <Typography>
            NO. OF STYDENTS IN CLASS{" "}
            <span className="font-black uppercase underline ">
              {students?.data?.length}
            </span>
          </Typography>
        </Box>
      </Box>
      <Box className="" style={{ marginTop: 10 }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Box>
    </Box>
  );
};

export default SingleStudentResultBroadSheetDetails;
