import React, { useEffect, useState } from "react";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { ChangePasswordSchema, LoginSchema } from "@/lib/schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  changePassword,
  getUserDetails,
  login,
  reset,
} from "@/features/auth/authSlice";
import toast from "react-hot-toast";
import { Label } from "../ui/label";

const UpdatePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.pbTeachersAuth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      dispatch(changePassword(values));
    },
  });

  useEffect(() => {
    if (isSuccess && message == "Password changed successfully") {
      toast.success("Congratulations Password Changed Successfully");
      dispatch(reset());
      dispatch(getUserDetails());
      formik.resetForm();
    }

    if (isError) {
      toast.error(message, {});
      dispatch(reset());
    }
    if (isSuccess && isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  return (
    <Box className="sm:w-[50%] p-5 bg-white rounded-md shadow-md w-[100%]">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full space-y-4">
            <Box>
              <Label className="mb-1">Enter Current Password</Label>
              <Input
                placeholder="Enter Current Password"
                name="current_password"
                type={showPassword ? "text" : "password"}
                value={formik.values.current_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.current_password &&
              formik.errors.current_password ? (
                <span className="text-[10px] text-red-500 leading-none">
                  (*) {formik.errors.current_password}
                </span>
              ) : null}
            </Box>
            <Box>
              <Label className="mb-1">New Password</Label>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end">
                      {showPassword ? (
                        <VisibilityOff style={{ fontSize: "14px" }} />
                      ) : (
                        <Visibility style={{ fontSize: "14px" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.new_password && formik.errors.new_password ? (
                <span className="text-[10px] text-red-500 leading-none">
                  (*) {formik.errors.new_password}
                </span>
              ) : null}
            </Box>

            <Box>
              <Label className="mb-1">Confirm New Password</Label>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="new_password_confirmation"
                value={formik.values.new_password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end">
                      {showConfirmPassword ? (
                        <VisibilityOff style={{ fontSize: "14px" }} />
                      ) : (
                        <Visibility style={{ fontSize: "14px" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.new_password_confirmation &&
              formik.errors.new_password_confirmation ? (
                <span className="text-[10px] text-red-500 leading-none">
                  (*) {formik.errors.new_password_confirmation}
                </span>
              ) : null}
            </Box>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Please wait..." : "Update Password"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdatePasswordForm;
