import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useAddStudentResultsForm from "@/hooks/form-hooks/useAddStudentResultsForm";
import { useNavigate } from "react-router-dom";

// Generate the validation schema based on the assessment types

const AddStudentResultsForm = () => {
  const {
    subjectResult,
    formik,
    students,
    assessmentTypes,
    isLoading,
    studentsPerCourse,
  } = useAddStudentResultsForm();
  const navigate = useNavigate();

  return (
    <Box>
      {studentsPerCourse?.subjects?.students?.length < 1 ? (
        <Box className="bg-white rounded-md p-5">
          <Typography>No Student Has Selected this subject</Typography>
          <Button size="sm" className="mt-5" onClick={() => navigate(-1)}>
            Retun Back
          </Button>
        </Box>
      ) : (
        <Box className="bg-white rounded-md p-5">
          <Typography className="text-[13px] font-bold">
            {subjectResult} Result
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box className="space-y-4">
              {studentsPerCourse?.subjects?.students?.map((student, index) => (
                <Box className="flex items-center space-x-4" key={index}>
                  <Box>
                    <Label className="font-normal text-[12px] mb-1">
                      Student
                      <Input readOnly value={`${student?.student_name}`} />
                    </Label>
                  </Box>
                  <Box className="flex items-center space-x-2">
                    {assessmentTypes.map((grade, i) => (
                      <Box key={i}>
                        <Label className="font-normal text-[12px] mb-1">
                          {grade?.name}
                        </Label>
                        <Input
                          placeholder={`Max score is ${grade?.max_score}`}
                          className="text-[12px]"
                          name={`student_${student.student_id}_ca_${grade.id}`}
                          value={
                            formik.values[
                              `student_${student.student_id}_ca_${grade.id}`
                            ]
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched[
                          `student_${student.student_id}_ca_${grade.id}`
                        ] &&
                          formik.errors[
                            `student_${student.student_id}_ca_${grade.id}`
                          ] && (
                            <span className="text-red-500 text-[12px]">
                              {
                                formik.errors[
                                  `student_${student.student_id}_ca_${grade.id}`
                                ]
                              }
                            </span>
                          )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className="space-x-2">
              <Button
                type="submit"
                size="sm"
                className="mt-5"
                disabled={isLoading}>
                {isLoading ? "Please wait..." : "Submit Result"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="mt-5"
                onClick={() => navigate(-1)}>
                Retun Back
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default AddStudentResultsForm;
