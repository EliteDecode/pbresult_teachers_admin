import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import React from "react";

const SingleStudentResultDetails = ({ singleStudentResult }) => {
  const studentDetails = [
    {
      Key: "Firstname",
      Value: singleStudentResult?.data?.student?.firstname,
    },
    {
      Key: "Lastname",
      Value: singleStudentResult?.data?.student?.lastname,
    },
    {
      Key: "Email",
      Value: singleStudentResult?.data?.student?.email,
    },
    {
      Key: "DOB",
      Value: new Date(
        singleStudentResult?.data?.student?.dob
      ).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  const gradeDetails = [
    {
      Key: "Subject",
      Value: singleStudentResult?.data?.subject?.name,
    },
    {
      Key: "Commulative Score",
      Value: singleStudentResult?.data?.cumulative_score,
    },
    {
      Key: "Grade",
      Value: singleStudentResult?.data?.grade,
    },
  ];

  return (
    <Box>
      <Box className="bg-white rounded-md p-5 ">
        <Box>
          <Box className="space-y-4">
            {studentDetails?.map((item, index) => (
              <Box
                key={index}
                className="flex  items-center justify-between space-x-2">
                <Typography className="font-bold text-[14px] text-primary">
                  {item?.Key}:
                </Typography>
                <Typography>{item?.Value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="bg-white rounded-md p-5 mt-3 ">
        <Box>
          <Box className="space-y-4">
            {gradeDetails?.map((item, index) => (
              <Box
                key={index}
                className="flex  items-center justify-between space-x-2">
                <Typography className="font-bold text-[14px] text-primary">
                  {item?.Key}:
                </Typography>
                <Typography>{item?.Value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="bg-white rounded-md p-5 mt-3 ">
        <Box>
          <Box className="space-y-4">
            {singleStudentResult?.data?.continuous_assessment?.map(
              (item, index) => (
                <Box
                  key={index}
                  className="flex items-center justify-between space-x-2">
                  <Typography className="font-bold text-[14px] text-primary">
                    {item[1]}:
                  </Typography>
                  <Typography>{item[2]}</Typography>
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleStudentResultDetails;
