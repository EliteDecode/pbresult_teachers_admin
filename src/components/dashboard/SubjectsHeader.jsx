import React from "react";
import { Box } from "@mui/material";
import { AddSubjectForm } from "../Forms/AddSubjectForm";
const SubjectsHeader = () => {
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <AddSubjectForm />
      </Box>
    </div>
  );
};

export default SubjectsHeader;
