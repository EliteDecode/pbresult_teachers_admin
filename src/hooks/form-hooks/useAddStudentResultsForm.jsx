import { addStudentResult, reset } from "@/features/grade/gradeSlice";
import { addStudentResultSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const useAddStudentResultsForm = () => {
  const { studentsPerCourse } = useSelector((state) => state.student);
  const { singleTermGradings, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assessmentTypes = singleTermGradings?.data?.assessment_type_log || [];
  //   const validationSchema = addStudentResultSchema(assessmentTypes);

  const { subjectId, termId } = useParams();

  //This is to get the name of the subject and pass it to the header on the main page
  const subjectResult = user?.subjects?.find(
    (subject) => subject?.id == subjectId
  )?.name;

  useEffect(() => {
    if (isSuccess && message == "result added successfuly") {
      toast.success("Result added successfuly");
      navigate("/dashboard/results");
    }

    if (isError) {
      toast.error(message);
    }

    if (isError || isSuccess) {
      dispatch(reset());
    }
  }, [isLoading, isError, isSuccess]);

  const formik = useFormik({
    initialValues: studentsPerCourse?.subjects?.students?.reduce(
      (acc, student) => {
        assessmentTypes.forEach((grade) => {
          acc[`student_${student.student_id}_ca_${grade.id}`] = "";
        });
        return acc;
      },
      {}
    ),
    onSubmit: (values) => {
      const resultData = studentsPerCourse?.subjects?.students?.map(
        (student) => {
          const ca = assessmentTypes.reduce((acc, grade) => {
            acc[grade.id] =
              values[`student_${student.student_id}_ca_${grade.id}`];
            return acc;
          }, {});
          return {
            student_id: student.student_id,
            ca,
          };
        }
      );

      const data = {
        term_id: termId,
        subject_id: subjectId,
        submitted: 1,
        result_data: resultData,
      };

      // console.log(data);

      dispatch(addStudentResult(data));
    },
  });

  return {
    subjectResult,
    formik,
    studentsPerCourse,
    assessmentTypes,
    isLoading,
  };
};

export default useAddStudentResultsForm;
