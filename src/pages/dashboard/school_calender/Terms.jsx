import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import teachersImg from "../../../assets/icons/teachers-day.png";
import { Typography } from "antd";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import TermsTables from "@/components/Tables/TermsTables";
import { getTerms } from "@/features/calender/calenderSlice";
const Terms = () => {
  const { isLoading } = useSelector((state) => state.calender);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTerms());
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      {/* <TeachersHeader /> */}
      <Box
        className={`w-full mt-5 bg-white sm:px-5 sm:py-4 p-3 rounded-md mb-5`}>
        <Box className="flex  items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of all Terms
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                All terms
              </Typography>
            </Box>
          </Box>

          <Box className=" ">
            <Link to="/dashboard/terms/add-term">
              <Button
                variant="default"
                className="border-primary"
                icon={<Add />}>
                Add New Term
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="overflow-x-scroll  bg-white">
          <TermsTables />
        </Box>
      )}
    </Box>
  );
};

export default Terms;
