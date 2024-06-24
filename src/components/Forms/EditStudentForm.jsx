import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePassword, generateSchoolId } from "@/lib/functions";
import { useSelector } from "react-redux";

const EditStudentForm = ({ formik, loading }) => {
  const { isLoading, singleStudent } = useSelector((state) => state.student);

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

  return (
    <Box className="">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full ">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="firstname">
                    Firstname
                  </Label>
                  <Input
                    placeholder="e.g. Akinwale "
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.firstname}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="lastname">
                    Lastname
                  </Label>
                  <Input
                    placeholder="e.g.  Adele"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.lastname}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    placeholder="e.g.  Adele"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.email}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="address">
                    Address
                  </Label>
                  <Input
                    placeholder="e.g.  Adele"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.address}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="nin">
                    NIN
                  </Label>
                  <Input
                    placeholder="e.g. 203992099923"
                    name="nin"
                    type="number"
                    value={formik.values.nin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nin && formik.errors.nin ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.nin}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="dob">
                    Date of birth
                  </Label>
                  <Input
                    placeholder="e.g. 0703032230323"
                    name="dob"
                    type="date"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.dob && formik.errors.dob ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.dob}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Label className="text-[11px]" htmlFor="gender">
                  Gender {formik.values.gender.toString()}
                </Label>
                <Select
                  name="gender"
                  onValueChange={(value) =>
                    formik.setFieldValue("gender", value)
                  }
                  value={formik.values.gender.toString()}
                  className="text-[12px]">
                  <SelectTrigger className="w-[100%] text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.touched.gender && formik.errors.gender ? (
                  <span
                    className="text-[10px] text-red-500 -mt-2 leading-none"
                    style={{ fontSize: "10px" }}>
                    (*) {formik.errors.gender}
                  </span>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="phone">
                    Phone number
                  </Label>
                  <Input
                    placeholder="e.g. 203992099923"
                    name="phone"
                    type="number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.phone}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="date_enrolled">
                    Enrollment Date
                  </Label>
                  <Input
                    placeholder="e.g. 203992099923"
                    name="date_enrolled"
                    type="date"
                    value={formik.values.date_enrolled}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.date_enrolled &&
                  formik.errors.date_enrolled ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.date_enrolled}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="picture">
                    Student Passport
                  </Label>
                  <Input
                    placeholder="e.g. 203992099923"
                    name="picture"
                    type="file"
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.picture && formik.errors.picture ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.picture}
                    </span>
                  ) : null}
                </Box>
              </Grid>
            </Grid>

            <Box className="flex space-x-2 mt-10">
              {/* <Button
                className="w-full "
                type=""
                onClick={() => setIFirstForm(false)}>
                Next
              </Button> */}

              <Button
                className=" "
                type="submit"
                disabled={loading || isLoading}>
                {loading || isLoading ? "Please wait..." : "Edit Student"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditStudentForm;
