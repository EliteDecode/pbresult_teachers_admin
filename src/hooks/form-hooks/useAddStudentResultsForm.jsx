import { addStudentResult, reset } from "@/features/grade/gradeSlice";
import { addStudentResultSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const useAddStudentResultsForm = () => {
  const { studentsPerCourse } = useSelector((state) => state.student);
  const {
    singleTermGradings,
    resultsPerTermSubjectClass,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assessmentTypes = singleTermGradings?.data?.assessment_type_log || [];
  const { subjectId, termId } = useParams();

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

  const initialValues = useMemo(() => {
    const values = {};
    if (resultsPerTermSubjectClass?.data) {
      resultsPerTermSubjectClass.data.forEach((result) => {
        result.continuous_assessment.forEach((assessment) => {
          const [assessmentId, assessmentName, score] = assessment;
          values[`student_${result.student_id}_ca_${assessmentId}`] = score;
        });
      });
    }
    return values;
  }, [resultsPerTermSubjectClass]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const resultData = studentsPerCourse?.subjects?.students?.map(
        (student) => {
          const ca = {};

          // Process each assessment type, defaulting to 0 for missing scores
          assessmentTypes.forEach((grade) => {
            const score =
              values[`student_${student.student_id}_ca_${grade.id}`];
            ca[grade.id] =
              score !== undefined && score !== null && score !== ""
                ? score
                : "0"; // Set to "0" for missing scores
          });

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
