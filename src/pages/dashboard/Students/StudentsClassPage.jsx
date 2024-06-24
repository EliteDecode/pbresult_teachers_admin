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
import { Link, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { getStudents } from "@/features/students/studentSlice";
import StudentsTables from "@/components/Tables/StudentsTables";
import ClassTables from "@/components/Tables/ClassTables";

const StudentsClassPage = () => {
  const { isError, isSuccess, isLoading, message, students } = useSelector(
    (state) => state.student
  );

  const dispatch = useDispatch();

  const { classId } = useParams();

  const singleClass = students?.data?.find((item) => item?.name === classId);

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
                Overview of all Students
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                All Students
              </Typography>
            </Box>
          </Box>
          {/* <Box>
            <Box className="flex flex-wrap justify-center items-center space-x-1">
              <Box>
                <Typography className="text-[10px] font-semibold uppercase">
                  Select Session
                </Typography>
                <Select>
                  <SelectTrigger className="w-[100px] text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Session</SelectLabel>
                      <SelectItem value="2021/2022">2021/2022</SelectItem>
                      <SelectItem value="2022/2023">2022/2023</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Box>
              <Box>
                <Typography className="text-[10px] font-semibold uppercase">
                  Select Class
                </Typography>
                <Select onChange={(e) => setClassTaken(e.target.value)}>
                  <SelectTrigger className="w-[100px] text-xs">
                    <SelectValue placeholder="Select " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classes</SelectLabel>
                      <SelectItem value="JSS1">JSS1</SelectItem>
                      <SelectItem value="JSS2">JSS2</SelectItem>
                      <SelectItem value="JSS3">JSS3</SelectItem>
                      <SelectItem value="SS1">SS1</SelectItem>
                      <SelectItem value="SS2">SS2</SelectItem>
                      <SelectItem value="SS3">SS3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Box>
              <Box>
                <Typography className="text-[10px] font-semibold uppercase">
                  Select Subject
                </Typography>
                <Select onChange={(e) => setSubjectTaken(e.target.value)}>
                  <SelectTrigger className="w-[100px] text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Subjects</SelectLabel>
                      {subjectsList.map((subject, index) => (
                        <SelectItem key={index} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Box>

              <Button variant="default" className="mt-4 sm:w-min w-full">
                Filter
              </Button>
            </Box>
          </Box> */}
          <Box className=" ">
            <Link to="/dashboard/students/add-student">
              <Button
                variant="default"
                className="border-primary"
                icon={<Add />}>
                Add New Student
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="overflow-x-scroll  bg-white">
          <StudentsTables data={singleClass?.students} />
        </Box>
      )}
    </Box>
  );
};

export default StudentsClassPage;
