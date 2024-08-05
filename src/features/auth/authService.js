import axios from "axios";
import { API_URL } from "../api";

export const logout = async () => {
  localStorage.removeItem("pbSchoolTeacherUser");
  localStorage.removeItem("pbSchoolTeacherUserToken");
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/teacher/login`, userData);

  if (response.data.status == true) {
    localStorage.setItem(
      "pbSchoolTeacherUserToken",
      JSON.stringify(response.data.token)
    );
  }
  return response.data;
};

const changePassword = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/change-password`,
    userData,
    config
  );
  return response.data;
};

const getUserDetails = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/user`, config);

  if (response.data.status === true) {
    localStorage.setItem(
      "pbSchoolTeacherUser",
      JSON.stringify(response.data.data)
    );
  }

  return response.data.data;
};

const authService = {
  logout,
  getUserDetails,
  login,
  changePassword,
};

export default authService;
