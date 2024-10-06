import { useNavigate } from "react-router-dom";
import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";
import dashboardImg from "../../assets/icons/dashboard.png";

import { Calendar } from "@/components/ui/calendar";
import { getUserDetails, logout } from "@/features/auth/authSlice";
import { getTermById, getTerms } from "@/features/calender/calenderSlice";
import { getStudents } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { NotificationDashboard } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notifyImg from "../../assets/icons/notification.png";
import resultImg from "../../assets/icons/results.png";
import studentsImg from "../../assets/icons/student.png";
import logoutImg from "../../assets/icons/logout.png";
const DashboardHomePage = () => {
  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.student);
  const { isLoading, user } = useSelector((state) => state.pbTeachersAuth);
  const { terms, isLoading: loading } = useSelector((state) => state.calender);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTerms());
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (terms) {
      const termId = terms?.data?.find((term) => term?.current === 1)?.id;
      if (termId) {
        dispatch(getTermById(termId));
      }
    }
  }, [terms, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const HomeCardContents = [
    {
      title: "Your Profile",
      image: studentsImg,
      buttonText: "View Profile",
      link: "/dashboard/profile",
    },

    {
      title: "Add Results",
      image: resultImg,
      buttonText: "Add Results",
      link: "/dashboard/results",
    },
    {
      title: "Total Student",
      image: studentsImg,
      buttonText: "View Students",
      link: "/dashboard/students",
    },
    // {
    //   title: "Logout",
    //   image: logoutImg,
    //   buttonText: "Logout",
    //   link: "/dashboard/students",
    // },
  ];

  return (
    <Box>
      {isLoading || loading ? (
        <Loader />
      ) : (
        <Grid container spacing={1}>
          <Grid item sm={12} md={9}>
            <HeaderTitle
              img={dashboardImg}
              title="Overview"
              subtitle="Showing all data in the system"
            />
            <Grid container spacing={2}>
              {HomeCardContents.filter(
                (content) =>
                  !(content?.title === "Total Student" && !user?.classroom)
              ).map((item, index) => (
                <Grid item xs={12} sm={12} md={4} key={index}>
                  <Card className="border-none">
                    <Box className="flex justify-between items-center">
                      <CardHeader>
                        <CardTitle className="sm:text-[15px] text-[15px]">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <Box className="p-6">
                        <img
                          src={item.image}
                          alt={`${item.title} image`}
                          className="w-[32px]"
                        />
                      </Box>
                    </Box>
                    <CardFooter>
                      <Link to={item.link}>
                        <Button size="lg">{item.buttonText}</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={12} md={4}>
                <Card className="border-none">
                  <Box className="flex justify-between items-center">
                    <CardHeader>
                      <CardTitle className="sm:text-[15px] text-[15px]">
                        Logout
                      </CardTitle>
                    </CardHeader>
                    <Box className="p-6">
                      <img
                        src={logoutImg}
                        alt={`logout image`}
                        className="w-[32px]"
                      />
                    </Box>
                  </Box>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={handleLogout}>
                      Logout
                    </Button>
                  </CardFooter>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={3} className="hidden sm:block">
            <Box className="sticky top-0 border-l border-[#fafafa] sm:h-[100vh] h-min-screen overflow-y-scroll px-3 pt-5 pb-12">
              <Box>
                <Typography className="font-bold text-purple-900">
                  Recent activities
                </Typography>
                <Typography className="text-[9px] text-gray-600">
                  Showing last 6 result updated
                </Typography>
              </Box>
              <Box className="mt-1">
                {NotificationDashboard.slice(0, 3).map((item, index) => (
                  <Box
                    className="border-b border-gray-300 py-2 px-0"
                    key={index}>
                    <Box className="flex items-center space-x-2">
                      <Box className="p-2 rounded-full bg-white">
                        <img
                          src={notifyImg}
                          alt="notification image"
                          width="15px"
                        />
                      </Box>
                      <Box>
                        <Typography className="text-[10px] font-bold">
                          {item.title}
                        </Typography>
                        <Typography className="text-[8px] text-gray-500">
                          {item.admin}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center justify-end">
                      <Typography className="text-[8px]">
                        {item.timeline}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box className="bg-white w-full rounded-lg mt-5">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md w-full shadow"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardHomePage;
