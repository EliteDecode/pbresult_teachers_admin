import {
  addStudentResult,
  editStudentResult,
  reset,
} from "@/features/grade/gradeSlice";
import { addStudentResultSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const useEditStudentResultsForm = () => {
  const { singleStudentResult, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assessmentTypes =
    singleStudentResult?.data?.continuous_assessment || [];

  // Formik initialization
  const formik = useFormik({
    initialValues: assessmentTypes.reduce((acc, [id, name, score]) => {
      acc[id] = score || "";
      return acc;
    }, {}),
    onSubmit: (values) => {
      const data = {
        submitted: 1,
        studentTermResultId: singleStudentResult?.data?.id,
        continuous_assessment: [values],
      };

      dispatch(editStudentResult(data));
    },
  });

  // Update Formik values when singleStudentResult changes
  useEffect(() => {
    if (singleStudentResult) {
      const updatedValues = assessmentTypes.reduce((acc, [id, name, score]) => {
        acc[id] = score || "";
        return acc;
      }, {});

      formik.setValues(updatedValues); // Reset the form values when singleStudentResult changes
    }
  }, [singleStudentResult]);

  useEffect(() => {
    if (isSuccess && message === "result editted successfuly") {
      toast.success("Result updated successfully");
      navigate(0);
    }

    if (isError) {
      toast.error(message);
    }

    if (isError || isSuccess) {
      dispatch(reset());
    }
  }, [isLoading, isError, isSuccess, message, dispatch, navigate]);

  return {
    formik,
    assessmentTypes,
    isLoading,
  };
};

export default useEditStudentResultsForm;
