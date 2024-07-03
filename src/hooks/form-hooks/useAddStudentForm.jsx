import { addStudent, reset } from "@/features/students/studentSlice";
import { addStudentSchema } from "@/lib/schemas";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAddStudentForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isError, isSuccess, isLoading, message, singleStudent } = useSelector(
    (state) => state.student
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && message == "student added successfully") {
      toast.success("Congratulations student added successfully");
      navigate(`/dashboard/students/${singleStudent?.data?.id}`);
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

      dispatch(
        addStudent({ ...values, password_confirmation: values.password })
      );
    },
  });

  const handleImageChange = () => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("picture", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { isLoading: isLoading || loading, formik, handleImageChange };
};

export default useAddStudentForm;
