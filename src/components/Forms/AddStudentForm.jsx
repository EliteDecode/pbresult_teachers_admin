import React from "react";
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
import { generatePassword } from "@/lib/functions";

const AddStudentForm = ({ formik, isLoading, handleImageChange }) => {
  return (
    <Box className="">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full ">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
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
              <Grid item xs={12} sm={12} md={6}>
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
              {/* <Grid item xs={12} sm={12} md={4}>
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
              </Grid> */}

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
              {/* <Grid item xs={12} sm={12} md={4}>
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
              </Grid> */}
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
                  Gender
                </Label>
                <Select
                  name="gender"
                  onValueChange={(value) =>
                    formik.setFieldValue("gender", value)
                  }
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
                    Student/Parent Phone number <br /> <b>(NOT COMPULSORY)</b>
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
              {/* <Grid item xs={12} sm={12} md={4}>
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
              </Grid> */}
              <Grid item xs={12} sm={12} md={4}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="password">
                    Students Password
                  </Label>
                  <Input
                    placeholder=""
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    readOnly
                    onBlur={formik.handleBlur}
                    className="bg-gray-200 cursor-not-allowed"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.password}
                    </span>
                  ) : null}
                </Box>
                <Box
                  className="flex justify-end"
                  onClick={() =>
                    formik.setFieldValue("password", generatePassword())
                  }>
                  <Box className="sm:py-0.5 py-2 cursor-pointer text-[10px] rounded-md w-[70%] text-center bg-blue-500 hover:bg-blue-700 text-white px-1 mt-3 border">
                    <Typography className="text-[10px] text-white">
                      {" "}
                      Generate Password
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box className="flex space-x-2 mt-10">
              <Button className=" " type="submit" disabled={isLoading}>
                {isLoading ? "Please wait..." : "Add Student"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddStudentForm;
