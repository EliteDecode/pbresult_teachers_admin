import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";

import schoolLogo from "../../../assets/images/photoHolder.png";
import { Link, useNavigate } from "react-router-dom";
import AddStudentForm from "@/components/Forms/AddStudentForm";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addStudentSchema } from "@/lib/schemas";
import axios from "axios";
import { addStudent, reset } from "@/features/students/studentSlice";
import toast from "react-hot-toast";

const AddStudentPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isError, isSuccess, isLoading, message, token } = useSelector(
    (state) => state.student
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && message == "student added successfully") {
      toast.success("Congratulations student added successfully");
      navigate("/dashboard/students");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
    }
    if (isSuccess && isError) {
      dispatch(reset());
    }

    dispatch(reset());
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      nin: "",
      gender: "",
      password: "",
      picture: "",
      dob: "",
      address: "",
      phone: "",
      date_enrolled: "",
    },
    validationSchema: addStudentSchema,
    onSubmit: async (values) => {
      if (values.picture) {
        setLoading(true);
        const pictureFile = new FormData();
        pictureFile.append("file", values.picture);
        pictureFile.append("upload_preset", "bezf4kul");
        try {
          const pictureResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dgriiqmlx/image/upload",
            pictureFile
          );
          values.picture = pictureResponse.data.secure_url;
        } catch (error) {
          setLoading(false);
        }
      }
      setLoading(false);
      console.log(values);

      dispatch(
        addStudent({ ...values, password_confirmation: values.password })
      );
    },
  });

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
                <AddStudentForm formik={formik} loading={loading} />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={4}>
            <Box className=" rounded-md space-y-4">
              {/* <Typography className="text-[14px] font-semibold">
                School Logo
              </Typography> */}
              <Box className="flex items-center justify-end ">
                <img
                  src={formik.values.picture || schoolLogo}
                  alt="school Logo"
                  className="sm:w-[50%] w-full bg-white p-3 shadow-md rounded-md"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddStudentPage;
