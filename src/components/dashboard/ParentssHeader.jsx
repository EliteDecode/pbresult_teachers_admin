import React from "react";
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Typography } from "antd";
import { Box } from "@mui/material";
const ParentsHeader = () => {
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="border-primary" size="sm">
              Upload CSV
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to delete Adventist Comprehensive High School
                permanently from PB Resultvault. Do you still want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="border-primary" size="sm">
              Download CSV
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to delete Adventist Comprehensive High School
                permanently from PB Resultvault. Do you still want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Link to="/dashboard/parents/add-parent">
          <Button
            variant="default"
            className="border-primary"
            size="sm"
            icon={<Add />}>
            Add New Parent
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default ParentsHeader;
