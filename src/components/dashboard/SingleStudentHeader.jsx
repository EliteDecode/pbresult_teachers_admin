import React, { useState } from "react";

import { Typography } from "antd";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import teachersImg from "../../assets/icons/teachers-day.png";
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
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const SingleStudentHeader = ({ studentId, classId }) => {
  const [session, setSession] = useState();
  const navigate = useNavigate();
  const { sessions } = useSelector((state) => state.calender);

  const handleSelectTerm = () => {
    navigate(`/dashboard/students/result/${studentId}/${session}/${classId}`);
  };
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <Box className="bg-white flex flex-wrap sm:space-y-0 space-y-4 justify-between my-3 rounded-md px-4  w-full py-5">
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
          <Box className="flex items-center space-x-2">
            <Box className="space-x-2 flex items-center">
              <Link to={`/dashboard/students/edit-student/${studentId}`}>
                <Button variant="secondary">Edit Student Details</Button>
              </Link>
            </Box>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>View Student Result</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="text-center">
                  <AlertDialogTitle>Select Session</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Select
                      name="gender"
                      onValueChange={(value) => setSession(value)}
                      className="text-[12px]">
                      <SelectTrigger className="w-[100%] text-xs">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sessions</SelectLabel>
                          {sessions?.data?.map((item, index) => (
                            <SelectItem key={index} value={item?.id}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {session && (
                    <AlertDialogAction onClick={handleSelectTerm}>
                      Continue
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleStudentHeader;
