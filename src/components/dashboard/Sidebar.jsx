import { Box, IconButton } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";
import adminImg from "../../assets/icons/admin.png";
import { sidebar } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Sidebar = ({ setIsSidebar, isSidebar }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.pbTeachersAuth);

  const handleSidebarToggle = () => {
    if (window.innerWidth < 767) {
      setIsSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleSidebarToggle);
    return () => {
      window.removeEventListener("resize", handleSidebarToggle);
    };
  }, []);

  return (
    <Box
      className="h-screen sidebarx overflow-y-scroll border-2 border-gray-100 bg-[#fff] "
      style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      {" "}
      <Box>
        <Box className="p-2">
          <Box className="flex w-full items-center justify-between">
            <Box className=" h-10 w-10 flex justify-center items-center flex-col rounded-full bg-primary">
              <Typography className="text-white  text-[15px] font-black">
                PB
              </Typography>
            </Box>
            <Box className="text-center">
              <Typography className=" sm:text-[20px] text-[25px] font-bold">
                PBResultVault
              </Typography>
            </Box>
            <Box className="text-center md:hidden block">
              <IconButton
                onClick={() => setIsSidebar(!isSidebar)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer">
                <Close style={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
          </Box>

          <Box className="mt-2 space-x-2 flex items-center px-2 py-2 bg-[#919EAB29]">
            <img src={adminImg} alt="admin image" className="w-[30px]" />
            <Box>
              <Typography className="font-bold text-gray-600">
                {user?.firstname} {user?.lastname}
              </Typography>
              <Typography className="text-[10px] text-gray-500 -mt-1">
                Teachers Admin
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="mt-1">
          {sidebar.map((item, index) => {
            return (
              <Box className="px-2 py-1">
                <Box>
                  <Typography className="text-primary font-bold mb-1  text-[12px] uppercase">
                    {item.title}
                  </Typography>
                </Box>

                {item.content.map((item2, index2) => (
                  <Link
                    key={index2}
                    onClick={handleSidebarToggle}
                    to={item2.link}
                    className={`flex items-center space-x-2 p-2 mb-1 rounded-lg ${
                      location.pathname.includes(item2.link)
                        ? " bg-gray-100"
                        : "bg-[#fff] hover:bg-gray-100 border-[#fafafa]"
                    }     cursor-pointer`}>
                    <img
                      src={item2.Icon}
                      alt="sidebar icon"
                      className="sm:w-[16px] w-[20px]"
                      style={{
                        filter: location.pathname.includes(item2.link)
                          ? "grayscale(0%) hue-rotate(280deg)"
                          : "grayscale(100%)",
                      }}
                    />
                    <Typography className="-mt-0.5 sm:text-[12px] text-[17px] font-semibold">
                      {item2.Title}
                    </Typography>
                  </Link>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
