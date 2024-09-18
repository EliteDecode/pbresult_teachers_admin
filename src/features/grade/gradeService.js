import axios from "axios";
import { API_URL } from "../api";

const getTermGradingById = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/term-grading/${id}`, config);
  if (response.data) {
    localStorage.setItem(
      "pbSchoolAdminSingleTermGrading",
      JSON.stringify(response.data)
    );
  }
  return response.data;
};

const addStudentResult = async (token, result) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/result/bulk`, result, config);
  console.log(response);
  return response.data;
};

const editStudentResult = async (token, result) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/result/${result.studentTermResultId}`,
    result,
    config
  );
  return response.data;
};

const getStudentResult = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/result/student/${data.studentId}/term/${data.termId}/subject/${data.subjectId}`,
    config
  );
  if (response.data) {
    localStorage.setItem(
      "pbSchoolAdminSingleStudentResult",
      JSON.stringify(response.data)
    );
  }
  return response.data;
};

const getAllStudentResultPerClassPerSubject = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/result/classroom/${data.classroomId}/subject/${data.subjectId}/term/${data.termId}`,
    config
  );

  console.log(response.data);

  return response.data;
};

const getAllStudentResultPerClass = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/result/classroom/${data.classId}`,
    config
  );

  console.log(response.data);
  return response.data;
};

const getSingleStudentResultSheet = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(
    `${API_URL}/result/cumulative/student/${data.studentId}/session/${data.sessionId}`
  );

  const response = await axios.get(
    `${API_URL}/result/cumulative/student/${data.studentId}/session/${data.sessionId}`,
    config
  );

  console.log(response.data);

  return response.data;
};

const grade = {
  getTermGradingById,
  addStudentResult,
  getStudentResult,
  editStudentResult,
  getAllStudentResultPerClassPerSubject,
  getAllStudentResultPerClass,
  getSingleStudentResultSheet,
};

export default grade;
