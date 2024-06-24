import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "antd";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Box } from "@mui/material";
import { Label } from "../ui/label";
const SingleStudentHeader = ({ studentId, terms }) => {
  const [term, setTerm] = useState();
  const navigate = useNavigate();

  const handleSelectTerm = () => {
    navigate(`/dashboard/results/${term}`);
  };
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <Box className="bg-white flex justify-between my-3 rounded-md px-4  w-full py-5">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of Student
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                Single student details
              </Typography>
            </Box>
          </Box>
          <Box className="space-x-2 flex items-center">
            <Link to={`/dashboard/students/edit-student/${studentId}`}>
              <Button variant="secondary">Edit Student Details</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleStudentHeader;
