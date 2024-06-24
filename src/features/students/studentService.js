import axios from "axios";
import { API_URL } from "../api";

const addStudent = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/classroom-teacher-student`,
    data,
    config
  );

  return response.data;
};
const deactivateStudent = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/student/${id}`, config);
  return response.data;
};

const getStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/classroom-teacher-students`,
    config
  );

  if (response.data) {
    localStorage.setItem(
      "pbSchoolTeachersStudents",
      JSON.stringify(response.data)
    );
  }
  return response.data;
};
const getStudentsOfOfferedCourse = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/classroom/${data.classroom_id}/subject/${data.subject_id}/term/${data.term_id}/students`,
    config
  );

  if (response.data) {
    localStorage.setItem(
      "pbSchoolTeachersStudents",
      JSON.stringify(response.data)
    );
  }
  return response.data;
};

const getSingleStudent = async (token, studentsId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/student/${studentsId}`, config);

  return response.data;
};

const updateStudent = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/student/${data.studentsId}`,
    data,
    config
  );

  return response.data;
};

const productService = {
  addStudent,
  deactivateStudent,
  getStudents,
  updateStudent,
  getStudentsOfOfferedCourse,
  getSingleStudent,
};

export default productService;
