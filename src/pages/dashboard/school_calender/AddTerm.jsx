import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addSessionSchema, addTermSchema } from "@/lib/schemas";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addSession,
  addTerm,
  getSessions,
  reset,
} from "@/features/calender/calenderSlice";
import AddSessionsForm from "@/components/Forms/AddSessionsForm";
import AddTermForm from "@/components/Forms/AddTermForm";

const AddTerm = () => {
  const { isError, isSuccess, isLoading, message, sessions } = useSelector(
    (state) => state.calender
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSessions());
  }, []);

  useEffect(() => {
    if (isSuccess && message == "term added successfully") {
      toast.success("Congratulations term added successfully");
      navigate("/dashboard/terms");
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
      school_session_id: "",
      start_date: "",
      end_date: "",
      term_type: "",
      name: "",
      active: "",
      current: "",
    },
    validationSchema: addTermSchema,
    onSubmit: async (values) => {
      const active = values.active == "true" ? true : false;
      const current = values.current == "true" ? true : false;
      const school_session_id = sessions?.data?.find(
        (session) => session?.name == values.school_session_id
      )?.id;
      const term_type =
        values.term_type === "First"
          ? 1
          : values.term_type === "Second"
          ? 2
          : 3;

      const data = {
        name: values.name,
        active,
        current,
        school_session_id,
        term_type,
        start_date: values.start_date,
        end_date: values.end_date,
      };

      dispatch(addTerm(data));
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
                <AddTermForm formik={formik} isLoading={isLoading} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddTerm;
