import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
import { getStudents } from "@/features/students/studentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useResultBroadsheet = () => {
  const { resultsPerTermClass } = useSelector((state) => state.grade);
  const { isLoading } = useSelector((state) => state.student);
  const { terms } = useSelector((state) => state.calender);
  const { singleTerm } = useSelector((state) => state.calender);
  const { user } = useSelector((state) => state.pbTeachersAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
    if (user?.classroom?.id) {
      dispatch(
        getAllStudentResultPerClass({
          classId: user?.classroom?.id,
          termId: singleTerm?.data?.id,
        })
      );
    }
  }, []);
  const allSubjects = [
    ...new Set(
      resultsPerTermClass?.data?.student_results.flatMap((student) =>
        student.subjects.map((subject) => subject.name)
      )
    ),
  ];

  const getAssessmentTypes = () => {
    const allTypes = new Set();
    resultsPerTermClass?.data?.student_results.forEach((student) => {
      student.subjects.forEach((subject) => {
        subject.results[0]?.continuous_assessment.forEach((assessment) => {
          allTypes.add(assessment[1]);
        });
      });
    });
    return Array.from(allTypes);
  };

  const assessmentTypes = getAssessmentTypes();

  return { assessmentTypes, allSubjects, isLoading, resultsPerTermClass, user };
};

export default useResultBroadsheet;
