import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import { Button } from "@/components/ui/button";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";
import ProfileDetails from "@/components/dashboard/ProfileDetails";
import { getTermById, getTerms } from "@/features/calender/calenderSlice";
import { getUserDetails } from "@/features/auth/authSlice";
import { getStudents } from "@/features/students/studentSlice";
import GoBackBtn from "@/components/dashboard/GoBackBtn";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.student);
  const { isLoading, user } = useSelector((state) => state.pbTeachersAuth);
  const { terms, isLoading: loading } = useSelector((state) => state.calender);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTerms());
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (terms) {
      const termId = terms?.data?.find((term) => term?.current === 1)?.id;
      if (termId) {
        dispatch(getTermById(termId));
      }
    }
  }, [terms, dispatch]);

  return (
    <Box>
      <Box className="bg-white flex justify-between my-3 rounded-md p-1.5  w-full py-5">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of Teachers Profile
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              My Profile
            </Typography>
          </Box>
        </Box>
      </Box>

      <GoBackBtn />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <ProfileDetails user={user} />
          ) : (
            <>
              {" "}
              <Error />{" "}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;
