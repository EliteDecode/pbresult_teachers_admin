import { Box } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import useEditStudentResultsForm from "@/hooks/form-hooks/useEditStudentResultsForm";

const EditStudentResultForm = () => {
  const { formik, assessmentTypes, isLoading } = useEditStudentResultsForm();
  return (
    <Box className="bg-white rounded-md p-5">
      <Typography className="text-[13px] font-bold">Result</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box className="space-y-4">
          {assessmentTypes.map(([id, name, max_score], i) => (
            <Box key={i}>
              <Label className="font-normal text-[12px] mb-1">{name}</Label>
              <Input
                placeholder={`Max score is ${max_score}`}
                className="text-[12px]"
                name={String(id)}
                value={formik.values[id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
          ))}
        </Box>
        <Button type="submit" className="mt-5" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Submit Result"}
        </Button>
      </form>
    </Box>
  );
};

export default EditStudentResultForm;
