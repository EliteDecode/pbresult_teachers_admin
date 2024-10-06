import React from "react";
import { Typography } from "antd";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Box } from "@mui/material";
import { ViewModule } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const SingleStudentHeader = () => {
  const { user } = useSelector((state) => state.pbTeachersAuth);
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <Box className="bg-white flex flex-wrap  justify-between my-3 rounded-md px-4  w-full py-5">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of student results
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                Student result
              </Typography>
            </Box>
          </Box>
          {user?.classroom && (
            <Link to="/dashboard/result/broadsheet" className="sm:mt-0 mt-5">
              <Button className="border-primary" icon={<ViewModule />}>
                View Result Broadsheet
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default SingleStudentHeader;
