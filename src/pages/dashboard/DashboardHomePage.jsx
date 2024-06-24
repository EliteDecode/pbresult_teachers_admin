import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Grid } from "@mui/material";
import dashboadImg from "../../assets/icons/dashboard.png";
import { Typography } from "antd";
import HeaderTitle from "@/components/dashboard/HeaderTitle";

import AreaChartComp from "../../components/Charts/AreaChartComp";
import { NotificationDashboard, usersData } from "@/lib/utils";
import notifyImg from "../../assets/icons/notification.png";
import { Calendar } from "@/components/ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "@/features/students/studentSlice";
import studentsImg from "../../assets/icons/student.png";
import calenderImg from "../../assets/icons/calendar.png";
import resultImg from "../../assets/icons/results.png";
import { Link } from "react-router-dom";
import Loader from "@/lib/Loader";

const DashboardHomePage = () => {
  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const { isLoading } = useSelector((state) => state.pbTeachersAuth);

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const HomeCardContents = [
    {
      title: "Total Student",
      description: students?.data?.length,
      image: studentsImg,
      buttonText: "View Students",
      link: "/dashboard/students",
    },

    {
      title: "Calender",
      description: "",
      image: calenderImg,
      buttonText: "View Calender",
    },
    {
      title: "Results",
      description: "0",
      image: resultImg,
      buttonText: "View Results",
    },
  ];
  return (
    <Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={1}>
          <Grid item sm={12} md={9} className="">
            <HeaderTitle
              img={dashboadImg}
              title="Overview"
              subtitle="Showing all data in the system"
            />
            <Grid container spacing={2}>
              {HomeCardContents.map((item, index) => (
                <Grid item xs={12} sm={12} md={4} key={index} className="">
                  <Card className="border-none">
                    <Box className="flex justify-between items-center">
                      <CardHeader>
                        <CardTitle className="text-[12px]">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-primary font-semibold">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <Box className="p-6">
                        <img
                          src={item.image}
                          alt=" image"
                          className="w-[32px]"
                        />
                      </Box>
                    </Box>

                    <CardFooter>
                      <Link to={item.link}>
                        <Button size="sm" variant="secondary">
                          {item.buttonText}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Grid container className="mt-5">
              <Grid item xs={12} sm={12} md={12}>
                <Box className="sm:h-[55vh] h-[45vh] py-5 bg-white rounded-md">
                  <Typography className="text-[14px] p-5 mb-5 font-semibold uppercase text-primary">
                    Overview of Users
                  </Typography>
                  <AreaChartComp
                    data={usersData}
                    stroke="#87CEEB"
                    fill="#87CEEB"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={3}>
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
                      <Typography className="text-[8px] ">
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
