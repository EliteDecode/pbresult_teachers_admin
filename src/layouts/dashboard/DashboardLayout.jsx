import AlertPasswordChange from "@/components/Modals/AlertPasswordChange";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { getUserDetails, reset } from "@/features/auth/authSlice";
import { getTermById, getTerms } from "@/features/calender/calenderSlice";
import Loader from "@/lib/Loader";
import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const {
    user,
    isSuccess,
    isError,
    message,
    isLoading: loading,
  } = useSelector((state) => state.pbTeachersAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767 && isSidebar) {
        setIsSidebar(false);
      }
      if (window.innerWidth > 767) {
        setIsSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebar]);

  useLayoutEffect(() => {
    if (window.innerWidth > 767) {
      setIsSidebar(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess && isError) {
      dispatch(reset());
    }
  }, [isError, isSuccess, dispatch, message]);

  return (
    <div>
      {user?.school_user?.changed_password == 0 && <AlertPasswordChange />}
      <Box
        className={`flex flex-wrap h-screen overflow-y-scroll ${
          isSidebar ? "overflow-y-hidden" : "overflow-y-scroll"
        }`}>
        <Box
          data-aos="slide-right"
          data-aos-duration="1200"
          data-aos-easing="ease-in-sine"
          className={`sidebar transit  bg-white z-30 ${
            isSidebar ? "showSidebar  " : "sm:w-[0%]"
          }`}
          sx={{
            left: {
              xs: isSidebar ? "0" : "-100%",
              sm: isSidebar ? "0" : "-100%", // Keep sidebar hidden for small screens
            },
          }}>
          <Sidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
        </Box>
        <Box
          className={`${
            isSidebar ? "header" : "sm:w-[100%]"
          } header transit  bg-[#919EAB29] w-[100%]`}>
          <Header setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
          <Box className=" sm:p-5 p-2 ">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardLayout;
