import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import schoolLogo from "../../assets/images/uploadImg.jpg";
import { Button } from "@/components/ui/button";
import { AddAPhoto, Edit, EditNote, Lock } from "@mui/icons-material";
import UpdateSchoolForm from "@/components/Forms/UpdateSchoolForm";
import { Link } from "react-router-dom";
import AddSchoolForm from "@/components/Forms/AddSchoolForm";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const DashboardAddSchoolPage = () => {
  const [isfirstForm, setIFirstForm] = useState(true);

  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Add School"
        subtitle=" Add a new school"
      />
      <Box role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/schools"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            All Schools
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            New School
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        {isfirstForm ? (
          <Grid container spacing={4}>
            <Grid item sm={12} md={5}>
              <Box className="bg-white rounded-md p-5 space-y-4">
                {/* <Typography className="text-[14px] font-semibold">
                School Logo
              </Typography> */}
                <Box className="flex items-center justify-center flex-col">
                  <img
                    src={schoolLogo}
                    alt="school Logo"
                    className="sm:w-[50%] w-full"
                  />
                  <Button
                    variant="outline"
                    className="text-[12px] mt-2.5 w-full space-x-1 border-primary text-primary">
                    <AddAPhoto style={{ fontSize: "14px" }} />{" "}
                    <span>Uploadd School Logo</span>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <AddSchoolForm setIFirstForm={setIFirstForm} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Box className="bg-white rounded-md p-3">
                <Box className="flex items-center">
                  <Lock
                    className="text-primary"
                    style={{ fontSize: "16px", color: "#4B0064" }}
                  />
                  <Typography className="font-bold text-[12px] text-primary">
                    PIN PURCHASE
                  </Typography>
                </Box>
                <Box className="mt-2">
                  <Typography className="text-gray-400 text-[12px]">
                    <span className="text-red-500">(*)</span> Important
                    Information:
                  </Typography>
                  <ul className="space-y-1 mt-2">
                    <li className="text-[12px] font-semibold">
                      {" "}
                      1. Only yearly package is available for now
                    </li>
                    <li className="text-[12px] font-semibold">
                      2. Kindly choose the range of students to view the package
                      price
                    </li>
                  </ul>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DashboardAddSchoolPage;
