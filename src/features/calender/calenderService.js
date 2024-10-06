import axios from "axios";
import { API_URL } from "../api";

const addSession = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/school-session`, data, config);

  return response.data;
};

const getSessions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/school-session`, config);

  if (response.data) {
    localStorage.setItem("pbSchoolAdminSession", JSON.stringify(response.data));
  }

  return response.data;
};

const getSessionById = async (token, sessionId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/school-session/${sessionId}`,
    config
  );

  if (response.data) {
    localStorage.setItem("pbSchoolAdminSession", JSON.stringify(response.data));
  }

  return response.data;
};

const updateSession = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/school-session/${data.sessionId}`,
    data,
    config
  );
  return response.data;
};

const addTerm = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/term`, data, config);

  return response.data;
};

const getTerms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/term`, config);
  if (response.data) {
    localStorage.setItem("pbTeacherAdminTerms", JSON.stringify(response.data));
  }

  return response.data;
};

const getTermById = async (token, termId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/term/${termId}`, config);

  if (response.data) {
    localStorage.setItem(
      "pbTeacherSingleAdminTerm",
      JSON.stringify(response.data)
    );
  }

  return response.data;
};

const updateTerm = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/term/${data.termId}`,
    data,
    config
  );
  return response.data;
};

const productService = {
  getSessions,
  addSession,
  updateSession,
  getSessionById,
  getTerms,
  getTermById,
  addTerm,
  updateTerm,
};

export default productService;
