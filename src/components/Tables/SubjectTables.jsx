import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const SubjectTables = () => {
  const { user } = useSelector((state) => state.pbTeachersAuth);
  const { terms } = useSelector((state) => state.calender);

  const termId = terms?.data?.find(
    (term) => term?.active == "1" && term?.current == "1"
  )?.id;

  const columns = [
    {
      title: "Subject",
      width: "50%",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      width: "20%",
      dataIndex: "classroom_name",
      key: "classroom_name",
      render: (_, record) => (
        <span className="font-bold">{record?.classroom_name}</span>
      ),
    },
    {
      title: "Action",
      width: "50%",
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/dashboard/results/${termId}/${record?.id}/${record?.classroom_id}`}
            className="flex-grow">
            <Button
              size="sm"
              variant="default"
              className="w-full text-[10px] font-semibold whitespace-nowrap">
              Add Student Result
            </Button>
          </Link>
          <Link
            to={`/dashboard/results/view/${termId}/${record?.id}/${record?.classroom_id}`}
            className="flex-grow">
            <Button
              size="sm"
              className="w-full border bg-white border-primary text-primary text-[10px] font-semibold whitespace-nowrap">
              View Student Result
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={user?.subjects}
        scroll={{ x: true }}
        className="text-[12px]"
      />
    </div>
  );
};

export default SubjectTables;
