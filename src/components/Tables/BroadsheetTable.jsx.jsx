import { transformData } from "@/lib/functions";
import { Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const BroadsheetTable = ({ classroom }) => {
  const { resultsPerTermClass } = useSelector((state) => state.grade);
  const navigate = useNavigate();
  const { result, subjects, assessments } = transformData(
    resultsPerTermClass?.data?.student_results
  );

  const baseColumns = [
    {
      title: "Name",
      dataIndex: "student_name",
      key: "student_name",
    },
  ];
  const dynamicColumns = subjects.map((subject) => {
    const termColumns = Object.keys(assessments[subject]).map((term) => {
      const subColumns = assessments[subject][term].map((assessment) => ({
        title: assessment,
        dataIndex: `${subject}_${term}_${assessment}`,
        key: `${subject}_${term}_${assessment}`,
      }));
      subColumns.push(
        {
          title: "Total",
          dataIndex: `${subject}_${term}_cumulative_score`,
          key: `${subject}_${term}_cumulative_score`,
        },
        {
          title: "Grade",
          dataIndex: `${subject}_${term}_grade`,
          key: `${subject}_${term}_grade`,
        }
      );
      return {
        title: term,
        children: subColumns,
      };
    });
    return {
      title: subject,
      children: termColumns,
    };
  });

  const columns = [...baseColumns, ...dynamicColumns];
  // const csvData = result.map((row) => {
  //   const csvRow = { "Student Name": row?.student_name };
  //   subjects.forEach((subject) => {
  //     assessments[subject]?.forEach((assessment) => {
  //       csvRow[`${subject} ${assessment}`] = row[`${subject}_${assessment}`];
  //     });
  //     csvRow[`${subject} Cumulative Score`] =
  //       row[`${subject}_cumulative_score`];
  //     csvRow[`${subject} Grade`] = row[`${subject}_grade`];
  //   });
  //   return csvRow;
  // });

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Student Name"];

    subjects.forEach((subject) => {
      tableColumn.push(`${subject} Cumulative Score`);
      tableColumn.push(`${subject} Grade`);
      assessments[subject].forEach((assessment) => {
        tableColumn.push(`${subject} ${assessment}`);
      });
    });

    const tableRows = result.map((row) => {
      const rowData = [row.student_name];
      subjects.forEach((subject) => {
        rowData.push(row[`${subject}_cumulative_score`]);
        rowData.push(row[`${subject}_grade`]);
        assessments[subject].forEach((assessment) => {
          rowData.push(row[`${subject}_${assessment}`]);
        });
      });
      return rowData;
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("students-results.pdf");
  };

  return (
    <>
      <div className="mb-4 space-x-2">
        {/* <CSVLink
          data={csvData}
          filename={`${classroom}-results.csv`}
          className="btn btn-primary"
          target="_blank">
          <Button size="sm">Export to CSV</Button>
        </CSVLink> */}
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          Return
        </Button>

        {/* <Button onClick={exportToPDF}>Export to PDF</Button> */}
      </div>
      <Table
        columns={columns}
        dataSource={result}
        pagination={false}
        rowKey="student_name"
        className="table-bordered"
      />
    </>
  );
};
export default BroadsheetTable;
