import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import passport from "../../assets/images/student_passport.jpeg";

const SingleStudentDetails = ({ singleStudent }) => {
  const studentsDetails = [
    {
      title: "Firstname",
      value: singleStudent?.data?.firstname,
    },
    {
      title: "Lastname",
      value: singleStudent?.data?.lastname,
    },
    {
      title: "School Id number",
      value: singleStudent?.data?.student_school_id,
    },
    {
      title: "Address",
      value: singleStudent?.data?.address,
    },
    {
      title: "Gender",
      value: `${singleStudent?.data?.gender === "M" ? "Male" : "Female"} `,
    },
    {
      title: "Phone Number",
      value: singleStudent?.data?.phone,
    },
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={7}>
        <Box className="bg-white rounded-md p-5 ">
          <Box>
            <Box className="space-y-4">
              {studentsDetails.map((item, index) => (
                <Box
                  key={index}
                  className="flex  items-center justify-between space-x-2">
                  <Typography className="font-bold text-[14px] text-primary">
                    {item.title}:
                  </Typography>
                  <Typography>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={12} md={5}>
        <Box className=" rounded-md space-y-4">
          <Box className="flex items-center justify-end ">
            <img
              src={singleStudent?.data?.picture || passport}
              alt="school Logo"
              className="sm:w-[50%] w-full bg-white p-3 shadow-md rounded-md"
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SingleStudentDetails;
