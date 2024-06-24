import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import schoolLogo from "../../../assets/images/photoHolder.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditStudentForm from "@/components/Forms/EditStudentForm";
import { useFormik } from "formik";
import {
  getSingleStudent,
  reset,
  updateStudent,
} from "@/features/students/studentSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addStudentSchema } from "@/lib/schemas";
import Loader from "@/lib/Loader";

const EditStudentsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isError, isSuccess, isLoading, message, singleStudent } = useSelector(
    (state) => state.student
  );

  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    if (isSuccess && message == "student edited successfully") {
      toast.success("Congratulations student updated successfully");
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

  useEffect(() => {
    dispatch(getSingleStudent(studentId));
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: singleStudent?.data?.firstname || "",
      lastname: singleStudent?.data?.lastname || "",
      email: singleStudent?.data?.email || "",
      nin: singleStudent?.data?.nin || "",
      gender: singleStudent?.data?.gender || "",
      picture: singleStudent?.data?.picture || "",
      dob: singleStudent?.data?.dob || "",
      address: singleStudent?.data?.address || "",
      phone: singleStudent?.data?.phone || "",
      date_enrolled: singleStudent?.data?.classroom?.date_enrolled || "",
    },
    validationSchema: addStudentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!values.picture.startsWith("https")) {
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

      dispatch(updateStudent({ ...values, studentsId: studentId }));
    },
  });
  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Edit Student"
        subtitle="Edit the details of a student"
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
            Edit Student Details
          </Link>
        </Breadcrumbs>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <EditStudentForm formik={formik} loading={loading} />
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
                    src={formik.values.picture || passport}
                    alt="Student Passport"
                    className="sm:w-[50%] w-full bg-white p-3 shadow-md rounded-md"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EditStudentsPage;
