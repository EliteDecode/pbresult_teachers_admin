import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import schoolLogo from "../../../assets/images/photoHolder.png";
import { Link } from "react-router-dom";
import AddStudentForm from "@/components/Forms/AddStudentForm";
import useAddStudentForm from "@/hooks/form-hooks/useAddStudentForm";

const AddStudentPage = () => {
  const { isLoading, formik, handleImageChange } = useAddStudentForm();
  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Add New Student"
        subtitle=" Add a new student"
      />
      <Box role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/students"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Students
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            New Student
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <Box className="bg-white rounded-md p-5 ">
              <Box>
                <AddStudentForm
                  formik={formik}
                  isLoading={isLoading}
                  handleImageChange={handleImageChange}
                />
              </Box>
            </Box>
          </Grid>
          {/* <Grid item sm={12} md={4}>
            <Box className=" rounded-md space-y-4">
              <Box className="flex items-center justify-end ">
                <img
                  src={formik.values.picture || schoolLogo}
                  alt="school Logo"
                  className="sm:w-[50%] w-full bg-white p-3 shadow-md rounded-md"
                />
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default AddStudentPage;
