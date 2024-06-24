import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addSessionSchema } from "@/lib/schemas";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addSession, reset } from "@/features/calender/calenderSlice";
import AddSessionsForm from "@/components/Forms/AddSessionsForm";

const AddSession = () => {
  const { isError, isSuccess, isLoading, message, token } = useSelector(
    (state) => state.calender
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && message == "session added successfully") {
      toast.success("Congratulations session added successfully");
      navigate("/dashboard/sessions");
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
      start_year: "",
      end_year: "",
      name: "",
      active: "",
      current: "",
    },
    validationSchema: addSessionSchema,
    onSubmit: async (values) => {
      const active = values.active == "true" ? true : false;
      const current = values.current == "true" ? true : false;

      dispatch(
        addSession({
          active,
          current,
          start_year: values.start_year,
          end_year: values.end_year,
          name: values.name,
        })
      );
    },
  });

  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Add New Teacher"
        subtitle=" Add a new teacher"
      />
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
            Add New Session
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <Box className="bg-white rounded-md p-5 ">
              <Box>
                <AddSessionsForm formik={formik} isLoading={isLoading} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddSession;
