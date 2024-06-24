import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import teachersImg from "../../assets/icons/teachers-day.png";

const StudentHeader = () => {
  return (
    <Box className={`w-full mt-5 bg-white sm:px-5 sm:py-4 p-3 rounded-md mb-5`}>
      <Box className="flex  items-center justify-between">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of all Students
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              All Students
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center space-x-2 ">
          <Link to="/dashboard/students/add-student">
            <Button variant="default" className="border-primary" icon={<Add />}>
              Add New Student
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentHeader;
