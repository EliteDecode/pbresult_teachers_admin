import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ArrowBack } from "@mui/icons-material";
import Loader from "@/lib/Loader";
import { getAllStudentResultPerClass } from "@/features/grade/gradeSlice";
import { getStudents } from "@/features/students/studentSlice";

export default function ResultBroadsheet() {
  const { resultsPerTermClass } = useSelector((state) => state.grade);
  const { students, isLoading } = useSelector((state) => state.student);
  const { singleTerm } = useSelector((state) => state.calender);
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableRef = useRef(null);

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

  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      const handleScroll = () => {
        const scrollLeft = table.scrollLeft;
        const scrollTop = table.scrollTop;
        const firstCol = table.querySelector("thead th:first-child");
        const headerRow = table.querySelector("thead");

        firstCol.style.transform = `translateX(${scrollLeft}px)`;
        headerRow.style.transform = `translateY(${scrollTop}px)`;
      };

      table.addEventListener("scroll", handleScroll);
      return () => table.removeEventListener("scroll", handleScroll);
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    const workbook = XLSX.utils.book_new();

    // Create headers
    const headers = [
      ["Jonathan Groups of School"],
      [`Class: ${resultsPerTermClass?.data?.classroom_name}`],
      [`Total Students: ${resultsPerTermClass?.data?.student_results?.length}`],
      [`Results Available: ${allSubjects.length}`],
      ["Class Teacher: Babatunde Samuel"],
      [],
      [
        "Name",
        ...allSubjects.flatMap((subject) => {
          return [
            ...assessmentTypes,
            "Term Cum.",
            "Last Term Cum.",
            "Total Cum.",
            "Class Avg.",
            "Position",
            "Grade",
          ].map((header) => `${subject} - ${header}`);
        }),
      ],
    ];

    // Create data rows
    const data = resultsPerTermClass?.data?.student_results.map((student) => {
      const row = [student.student_name];

      allSubjects.forEach((subjectName) => {
        const subjectData = student.subjects.find(
          (s) => s.name === subjectName
        );

        // Add assessment scores
        assessmentTypes.forEach((type) => {
          const assessment =
            subjectData?.results[0]?.continuous_assessment.find(
              (a) => a[1] === type
            );
          row.push(assessment ? assessment[2] : "N/A");
        });

        // Add other columns
        row.push(
          subjectData?.results?.[0]?.cumulative_score || 0,
          "-",
          subjectData?.average_score || 0,
          subjectData?.results?.[0]?.class_average || 0,
          "-",
          subjectData?.average_grade || "-"
        );
      });

      return row;
    });

    const finalData = [...headers, ...data];
    XLSX.utils.sheet_add_aoa(worksheet, finalData);

    // Set column widths
    const columnWidths = finalData[6].map(() => ({ wch: 15 }));
    columnWidths[0] = { wch: 25 }; // Make the name column wider
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Result Broadsheet");
    XLSX.writeFile(workbook, "result_broadsheet.xlsx");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-full mx-auto p-4">
          <div className="flex relative items-start justify-between mb-6">
            <img src={user?.school?.picture} alt="" className="w-[8%]" />

            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-center">
                Jonathan Groups of School
              </h1>
              <p className="text-center">
                Class: {resultsPerTermClass?.data?.classroom_name}
              </p>
              <p className="text-center">
                Total Student:{" "}
                {resultsPerTermClass?.data?.student_results?.length}
              </p>
              <p className="text-center">
                Result Available: {allSubjects.length}
              </p>
              <p className="text-center">Class Teacher: Babatunde Samuel</p>
            </div>
            <div className="space-x-2 flex absolute right-10 items-center">
              <Button
                variant="destructive"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2">
                <ArrowBack className="w-4 h-4" />
                Go Back
              </Button>
              <Button
                onClick={exportToExcel}
                className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export to Excel
              </Button>
            </div>
          </div>

          <div
            className="overflow-auto"
            ref={tableRef}
            style={{ maxWidth: "100vw", maxHeight: "80vh" }}>
            <table
              className="w-full border-collapse border border-gray-300"
              style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col className="w-48" /> {/* Name column */}
                {allSubjects.map((_, index) => (
                  <React.Fragment key={index}>
                    {[...Array(9)].map((_, i) => (
                      <col key={`${index}-${i}`} className="w-24" />
                    ))}
                  </React.Fragment>
                ))}
              </colgroup>
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th className="border border-gray-300 p-2 sticky left-0 z-20 bg-white"></th>
                  {allSubjects.map((subject, index) => (
                    <th
                      key={index}
                      className={`border p-2 text-[12px] border-gray-300 font-medium whitespace-nowrap`}
                      colSpan="9">
                      {subject}
                    </th>
                  ))}
                </tr>

                <tr>
                  <th className="border  border-gray-300 p-2 sticky left-0 z-20 bg-white">
                    Name
                  </th>
                  {allSubjects.map((_, subjectIndex) => (
                    <th
                      key={subjectIndex}
                      className={` border border-gray-300 p-2 text-[12px] font-medium whitespace-nowrap`}
                      colSpan="9">
                      Third Term
                    </th>
                  ))}
                </tr>
                <tr className="bg-gray-300">
                  <th className="border border-gray-300 p-2 whitespace-nowrap sticky left-0 z-20 bg-gray-300"></th>
                  {allSubjects.map((_, subjectIndex) => (
                    <React.Fragment key={subjectIndex}>
                      {assessmentTypes.map((type) => (
                        <th
                          key={type}
                          className={`${
                            subjectIndex % 2 === 0
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "border-gray-300"
                          } border p-2 text-[12px] font-medium whitespace-nowrap`}>
                          {type}
                        </th>
                      ))}
                      {[
                        "Term Cum.",
                        "Last Term Cum.",
                        "Total Cum.",
                        "Class Avg.",
                        "Position",
                        "Grade",
                      ].map((header) => (
                        <th
                          key={header}
                          className={`${
                            subjectIndex % 2 === 0
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "border-gray-300"
                          } border p-2 text-[12px] font-medium whitespace-nowrap`}>
                          {header}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultsPerTermClass?.data?.student_results?.map(
                  (student, studentIndex) => (
                    <tr
                      key={studentIndex}
                      className={
                        studentIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }>
                      <td className="border border-gray-300 p-2 whitespace-nowrap sticky left-0 z-1 bg-inherit">
                        {student.student_name}
                      </td>
                      {allSubjects.map((subjectName, subjectIndex) => {
                        const subjectData = student.subjects.find(
                          (s) => s.name === subjectName
                        );

                        return (
                          <React.Fragment key={subjectIndex}>
                            {assessmentTypes.map((type) => {
                              const assessment =
                                subjectData?.results[0]?.continuous_assessment.find(
                                  (a) => a[1] === type
                                );
                              return (
                                <td
                                  key={type}
                                  className="border border-gray-300 p-1 text-center">
                                  {assessment ? assessment[2] : "N/A"}
                                </td>
                              );
                            })}
                            <td className="border border-gray-300 p-1 text-center">
                              {subjectData?.results?.[0]?.cumulative_score || 0}
                            </td>
                            <td className="border border-gray-300 p-1 text-center">
                              -
                            </td>
                            <td className="border border-gray-300 p-1 text-center">
                              {subjectData?.average_score || 0}
                            </td>
                            <td className="border border-gray-300 p-1 text-center">
                              {Math.round(
                                subjectData?.results?.[0]?.class_average || 0
                              )}
                            </td>
                            <td className="border border-gray-300 p-1 text-center">
                              -
                            </td>
                            <td className="border border-gray-300 p-1 text-center">
                              {subjectData?.average_grade || "-"}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
