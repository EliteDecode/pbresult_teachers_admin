import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import useAddStudentResultsForm from "@/hooks/form-hooks/useAddStudentResultsForm";
import { useNavigate } from "react-router-dom";

const AddStudentResultsForm = () => {
  const {
    subjectResult,
    formik,
    assessmentTypes,
    isLoading,
    studentsPerCourse,
  } = useAddStudentResultsForm();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-4">
      {studentsPerCourse?.subjects?.students?.length < 1 ? (
        <Card className="p-6 text-center">
          <Typography className="text-lg mb-4">
            No Student Has Selected this subject
          </Typography>
          <Button size="sm" onClick={() => navigate(-1)}>
            Return Back
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Typography className="text-xl font-bold">
              {subjectResult} Results
            </Typography>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Return Back
            </Button>
          </div>

          <form onSubmit={formik.handleSubmit} className="">
            <div className=" grid sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
              {studentsPerCourse?.subjects?.students?.map((student, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="border-l-4 border-primary">
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {student?.student_name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {assessmentTypes.map((grade, i) => (
                          <div key={i} className="space-y-2">
                            <Label className="text-sm font-medium flex justify-between">
                              <span>{grade?.name}</span>
                              <span className="text-gray-500 text-xs">
                                Max: {grade?.max_score}
                              </span>
                            </Label>
                            <Input
                              placeholder="Enter score"
                              className="text-sm"
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
                                <p className="text-red-500 text-xs mt-1">
                                  {
                                    formik.errors[
                                      `student_${student.student_id}_ca_${grade.id}`
                                    ]
                                  }
                                </p>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}>
                {isLoading ? "Submitting Results..." : "Submit All Results"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddStudentResultsForm;
