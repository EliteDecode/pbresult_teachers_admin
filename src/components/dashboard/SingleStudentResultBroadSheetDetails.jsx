import React, { useRef } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { usePDF } from "react-to-pdf";
import { Button } from "../ui/button";

const SingleStudentResultBroadSheetDetails = () => {
  const { singleStudentResultSheet } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const componentRef = useRef();

  const { toPDF, targetRef } = usePDF({
    filename: `${singleStudentResultSheet?.data?.student_name}.pdf`,
  });

  const processAssessments = (assessments) => {
    const testScores = assessments
      .slice(0, -1)
      .map((assessment) => assessment[2]);
    const examScore = assessments[assessments.length - 1][2];
    const average =
      testScores.reduce((sum, score) => sum + parseInt(score), 0) /
      testScores.length;

    return {
      testScores,
      average: average.toFixed(2),
      examScore,
    };
  };

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          toPDF();
        }}>
        Download Result
      </Button>
      <div
        ref={targetRef}
        className="p-8 bg-white"
        style={{ minWidth: "1000px" }}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            MINISTRY OF EDUCATION, SCIENCE AND TECHNOLOGY
          </h1>
          <h2 className="text-xl font-semibold uppercase">
            {user?.school?.name}
          </h2>
          <p>
            REPORT FOR:{" "}
            {singleStudentResultSheet?.data.subjects[0].results[0].term_name}{" "}
            TERM {new Date().getFullYear()}
          </p>
        </div>

        <div className="mb-4">
          <p>Student's Name: {singleStudentResultSheet?.data.student_name}</p>
          <p>Class: {singleStudentResultSheet?.data.classroom_name}</p>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th rowSpan="2" className="border border-gray-300 p-1">
                SUBJECTS
              </th>
              <th colSpan="3" className="border border-gray-300 p-1">
                CONTINUOUS ASSESSMENT
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                EoTT 100%
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                TOTAL 100%
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Last Term Cum.
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Total Cum.
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Class Avg.
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Position
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Grade
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Remark
              </th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1">a 100%</th>
              <th className="border border-gray-300 p-1">b 100%</th>
              <th className="border border-gray-300 p-1">c Avg.</th>
            </tr>
          </thead>
          <tbody>
            {singleStudentResultSheet?.data?.subjects.map((subject) => {
              const result = subject.results[0];
              const { testScores, average, examScore } = processAssessments(
                result.continuous_assessment
              );
              return (
                <tr key={subject.subject_id}>
                  <td className="border border-gray-300 p-1">
                    {subject.subject_name}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {testScores[0] || ""}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {testScores[1] || ""}
                  </td>
                  <td className="border border-gray-300 p-1">{average}</td>
                  <td className="border border-gray-300 p-1">{examScore}</td>
                  <td className="border border-gray-300 p-1">{result.score}</td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1">
                    {subject.total_cumulative_score}
                  </td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1">
                    {subject.cumulative_grade}
                  </td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleStudentResultBroadSheetDetails;
