import React, { useRef } from "react";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";

const SingleStudentResultBroadSheetDetails = () => {
  const { singleStudentResultSheet } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const componentRef = useRef();

  const handleDownloadPDF = () => {
    const element = componentRef.current;
    const opt = {
      margin: 1,
      filename: `${singleStudentResultSheet?.data?.student_name}_result_sheet.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  //make this dynamic calculation
  const calculateTestAverage = (tests) => {
    const scores = tests.map((test) => parseInt(test[2]));
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDownloadPDF}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download Result Sheet as PDF
      </button>
      <div
        ref={componentRef}
        className="p-8 bg-white"
        style={{ minWidth: "1000px" }}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            MINISTRY OF EDUCATION, EKITI STATE
          </h1>
          <h2 className="text-xl font-semibold uppercase">
            {user?.school?.name}
          </h2>
          <p>
            REPORT FOR: 2022/2023 &nbsp;&nbsp;&nbsp;&nbsp; TERM:{" "}
            {singleStudentResultSheet?.data.subjects[0].results[0].term_name}
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
                Exam
                <br />
                100%
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Last Term
                <br />
                Cum.
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                TOTAL
                <br />
                100%
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                Class
                <br />
                Avg
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                GRADE
              </th>
              <th rowSpan="2" className="border border-gray-300 p-1">
                POSITION
              </th>
            </tr>
            <tr className="bg-gray-100">
              {/* Still not dynamic */}
              <th className="border border-gray-300 p-1">
                PT
                <br />
                100%
              </th>
              <th className="border border-gray-300 p-1">
                PT2
                <br />
                100%
              </th>
              <th className="border border-gray-300 p-1">
                ASS
                <br />
                100%
              </th>
            </tr>
          </thead>
          <tbody>
            {singleStudentResultSheet?.data?.subjects.map((subject) => {
              const result = subject.results[0];
              const tests = result.continuous_assessment.filter((assessment) =>
                assessment[1].startsWith("Test")
              );
              const exam = result.continuous_assessment.find(
                (assessment) => assessment[1] === "Exams"
              );
              return (
                <tr key={subject.subject_id}>
                  <td className="border border-gray-300 p-1">
                    {subject.subject_name}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {tests[0] ? tests[0][2] : ""}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {tests[1] ? tests[1][2] : ""}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {calculateTestAverage(tests).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {exam ? exam[2] : ""}
                  </td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1">{result.score}</td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1">{result.grade}</td>
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
