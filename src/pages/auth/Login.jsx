import React, { useEffect, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { Typography } from "antd";
import LoginForm from "@/components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const { token } = useSelector((state) => state.pbTeachersAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <Box className="h-screen bg-[#f7f7f7]">
      <Box className="bg-white  py-5">
        <Box className="container-c">
          <Box className="flex items-center">
            <Box className="sm:h-16 h-12 sm:w-16 w-12 flex justify-center items-center flex-col rounded-full bg-primary">
              <Typography className="text-white sm:text-[30px] text-[20px] font-black">
                PB
              </Typography>
            </Box>
            <Box className="text-center w-[100%]">
              <Typography className="sm:text-[30px] text-[20px] font-bold">
                PBResultVault Teacher's Portal
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        className="container-c sm:w-[40%] w-[100%] rounded-md sm:h-[50vh] h-[30vh] flex flex-col items-center justify-center m-auto bg-[white]"
        style={{ marginTop: 100 }}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
