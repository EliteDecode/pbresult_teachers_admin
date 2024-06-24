import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import React from "react";

const ProfileDetails = ({ user }) => {
  const userDetails = [
    {
      title: "Firstname",
      value: user?.firstname,
    },
    {
      title: "Lastname",
      value: user?.lastname,
    },
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Gender",
      value: user?.gender == "F" ? "Female" : "Male",
    },
    {
      title: "Phone Number",
      value: user?.phone,
    },
  ];

  return (
    <Box className="mt-5">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={7}>
          <Box className="bg-white rounded-md p-5 ">
            <Box>
              <Box className="space-y-4">
                {userDetails.map((item, index) => (
                  <Box
                    key={index}
                    className="flex  items-center justify-between space-x-2">
                    <Typography className="font-bold text-[14px] text-primary">
                      {item.title}:
                    </Typography>
                    <Typography>{item.value}</Typography>
                  </Box>
                ))}
                <Box className="flex items-center justify-between space-x-2">
                  <Typography className="font-bold text-[14px] text-primary">
                    Class Teacher:
                  </Typography>
                  <div className="flex space-x-2">
                    <Typography>{user?.classroom?.name}</Typography>
                  </div>
                </Box>
                <Box className="flex flex-wrap items-center justify-between ">
                  <Typography className="font-bold text-[14px] text-primary">
                    Assigned Subjects:
                  </Typography>
                  <div className="flex mt-2 flex-wrap gap-2">
                    {user?.subjects?.map((item, index) => (
                      <Typography key={index}>
                        {item?.name}
                        {index < user?.data?.subjects?.length - 1 && ","}{" "}
                        <span className="font-bold">
                          ({item?.classroom_name})
                        </span>
                      </Typography>
                    ))}
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={5}>
          <Box className="bg-white rounded-md p-5 space-y-4">
            <Typography className="text-[14px] font-semibold">
              Staff Id Card
            </Typography>
            <Box className="flex space-y-2 items-center justify-center flex-col">
              <img
                src={user?.school_user?.id_front_pic}
                alt="school Logo"
                className=" w-full"
              />

              <img
                src={user?.school_user?.id_back_pic}
                alt="school Logo"
                className=" w-full"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileDetails;
