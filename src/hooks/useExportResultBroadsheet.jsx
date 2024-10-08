import React, { useEffect, useRef } from "react";
import * as XLSX from "xlsx";

const useExportResultBroadsheet = () => {
  const tableRef = useRef(null);

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

  return { exportToExcel, tableRef };
};

export default useExportResultBroadsheet;
