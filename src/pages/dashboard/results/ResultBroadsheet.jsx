import { Button } from "@/components/ui/button";
import useExportResultBroadsheet from "@/hooks/useExportResultBroadsheet";
import useResultBroadsheet from "@/hooks/useResultBroadsheet";
import Loader from "@/lib/Loader";
import { ArrowBack } from "@mui/icons-material";
import { Download } from "lucide-react";
import React from "react";

export default function ResultBroadsheet() {
  const { assessmentTypes, allSubjects, isLoading, resultsPerTermClass, user } =
    useResultBroadsheet();
  const { exportToExcel, tableRef } = useExportResultBroadsheet();

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
