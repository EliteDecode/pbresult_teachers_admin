import { Box } from "@mui/material";
import { Typography } from "antd";
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

import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HeaderTitle = ({
  img,
  title,
  subtitle,
  BtnText,
  BtnText2,
  BtnTextType,
  BtnTextType2,
  route,
}) => {
  return (
    <>
      <Box
        className={`sm:w-full md:w-[40%] ${
          BtnText ? "lg:w-[100%]" : "lg:w-[100%]"
        } bg-white sm:p-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={img} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                {subtitle}
              </Typography>
            </Box>
          </Box>
          <Box>
            {BtnText && (
              <Box className="flex space-x-2 items-center ">
                {route == "singleSchool" ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={BtnTextType ? BtnTextType : "default"}>
                        {BtnText}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="text-center">
                        <AlertDialogTitle>
                          Confirm Deactivation
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to deactivate Adventist Comprehensive
                          High School from PB Resultvault. This will not delete
                          their file or account from the system. Do you still
                          want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : route == "school" ? (
                  <Link to="/dashboard/schools/add-school">
                    <Button variant={BtnTextType ? BtnTextType : "default"}>
                      {BtnText}
                    </Button>
                  </Link>
                ) : (
                  <Button variant={BtnTextType ? BtnTextType : "default"}>
                    {BtnText}
                  </Button>
                )}

                {BtnText2 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={BtnTextType2 ? BtnTextType2 : "default"}>
                        {BtnText2}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="text-center">
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to delete Adventist Comprehensive High
                          School permanently from PB Resultvault. Do you still
                          want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderTitle;
