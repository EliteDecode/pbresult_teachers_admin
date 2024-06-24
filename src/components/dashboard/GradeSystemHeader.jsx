import React from "react";
import { Box } from "@mui/material";
import { AddSubjectForm } from "../Forms/AddSubjectForm";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const GradeSystemHeader = () => {
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <Link to="/dashboard/grade-system/add">
          <Button>Customize Grade</Button>
        </Link>
      </Box>
    </div>
  );
};

export default GradeSystemHeader;
