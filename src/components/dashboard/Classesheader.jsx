import React from "react";
import { Button } from "../ui/button";
import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ClassesHeader = ({ arms }) => {
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        {arms?.school_arms?.length < 1 ? (
          <Button
            disabled={arms?.school_arms?.length < 1}
            variant="default"
            className="border-primary cursor-not-allowed"
            size="sm"
            icon={<Add />}>
            Add New Class
          </Button>
        ) : (
          <Link to="/dashboard/classes/add-class">
            <Button
              variant="default"
              className="border-primary"
              size="sm"
              icon={<Add />}>
              Add New Class
            </Button>
          </Link>
        )}

        <Link to="/dashboard/classes/add-arms">
          <Button
            variant="secondary"
            className="border-primary bg-blue-500 hover:bg-blue-700 text-white"
            size="sm"
            icon={<Add />}>
            Add New Arm
          </Button>
        </Link>
      </Box>
      {arms?.school_arms?.length < 1 && (
        <div className="flex mt-2 justify-end">
          <p className="text-[11px]">
            <span className="text-red-500 text-[11px]">(*)</span>Please add
            school arms before you can add classes
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassesHeader;
