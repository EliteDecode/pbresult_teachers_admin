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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "classroom_name",
      key: "classroom_name",
      render: (_, record) => (
        <span className="font-bold">{record?.classroom_name}</span>
      ),
    },
    {
      title: "Action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link
            to={`/dashboard/results/${termId}/${record?.id}/${record?.classroom_id}`}>
            <Button
              size="sm"
              variant="default"
              className=" text-[10px] font-semibold ">
              Add Student Result
            </Button>
          </Link>
          <Link
            to={`/dashboard/results/view/${termId}/${record?.id}/${record?.classroom_id}`}>
            <Button
              size="sm"
              className="border bg-white border-primary text-primary text-[10px] font-semibold ">
              View Student Result
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={user?.subjects}
      scroll
      className="text-[12px]"
    />
  );
};
export default SubjectTables;
