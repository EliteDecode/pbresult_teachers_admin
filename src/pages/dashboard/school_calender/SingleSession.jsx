import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Box, Grid } from "@mui/material";
import { Tag, Typography } from "antd";
import teachersImg from "../../../assets/icons/teachers-day.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";
import { getSessionById } from "@/features/calender/calenderSlice";

const SingleSession = () => {
  const { sessionId } = useParams();

  const { isError, isSuccess, isLoading, singleSession } = useSelector(
    (state) => state.calender
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessionById(sessionId));
  }, []);

  const sessionDetails = [
    {
      title: "Session Name",
      value: singleSession?.data?.name,
    },
    {
      title: "Session Start Year",
      value: singleSession?.data?.start_year,
    },
    {
      title: "Session End Year",
      value: singleSession?.data?.end_year,
    },
    {
      title: "Session Current Status",
      value: (
        <span>
          <Tag
            color={singleSession?.data?.current == true ? "success" : "error"}>
            {singleSession?.data?.current == true
              ? "Current Session"
              : "Not Current Session"}
          </Tag>
        </span>
      ),
    },
    {
      title: "Session Active Status",
      value: (
        <span>
          <Tag
            color={singleSession?.data?.active == true ? "success" : "error"}>
            {singleSession?.data?.active == true
              ? "Currently Active"
              : "Not Active"}
          </Tag>
        </span>
      ),
    },
  ];

  return (
    <Box>
      <Box className="bg-white flex justify-between my-3 rounded-md p-1.5  w-full py-5">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of Sessions
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              Single Session
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/sessions"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Sessions
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Single Session
          </Link>
        </Breadcrumbs>
      </Box>
      {isLoading && !singleSession ? (
        <Loader />
      ) : (
        <>
          {singleSession ? (
            <Box className="mt-5">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={4}>
                  <Box className="bg-white rounded-md p-5 ">
                    <Box>
                      <Box className="space-y-4">
                        {sessionDetails.map((item, index) => (
                          <Box
                            key={index}
                            className="flex  items-center justify-between space-x-2">
                            <Typography className="font-bold text-[14px] text-primary">
                              {item.title}:
                            </Typography>
                            <Typography>{item.value}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
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

export default SingleSession;
