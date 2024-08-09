import { generateColumns, generateDataSource } from "@/lib/functions";
import { Box } from "@mui/material";
import { Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "../ui/button";
import { usePDF } from "react-to-pdf";

const SingleStudentResultBroadSheetDetails = () => {
  const { singleStudentResultSheet } = useSelector((state) => state.grade);
  const { students } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms, sessions } = useSelector((state) => state.calender);

  const columns = generateColumns(singleStudentResultSheet?.data?.subjects);
  const dataSource = generateDataSource(
    singleStudentResultSheet?.data?.subjects
  );

  const activeTerm = terms?.data?.find((term) => term.current === 1)?.name;
  const activeSession = sessions?.data?.find(
    (session) => session.current === 1
  )?.name;
  const student = students?.data?.find(
    (student) => student.id == singleStudentResultSheet?.data?.student_id
  );

  const { toPDF, targetRef } = usePDF({
    filename: `${student?.student_school_id}.pdf`,
  });

  return (
    <>
      <Box
        className="p-2 border-2 w-[90%] sm:overflow-x-auto overflow-x-scroll m-auto bg-white rounded-md shadow-md result"
        ref={targetRef}>
        <Box className=" my-2 relative">
          <Box>
            <img
              src={user?.school?.picture}
              alt="school picture"
              className="w-[8%]  absolute"
            />
          </Box>
          <Box className="text-center">
            <Typography className="text-[20px] font-bold">
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
        <Box className="" style={{ marginTop: 2 }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Box>
      </Box>
      <Box className="w-[90%] mt-10 m-auto">
        <Button
          onClick={() => {
            toPDF();
          }}>
          Download Result
        </Button>
      </Box>
    </>
  );
};

export default SingleStudentResultBroadSheetDetails;
