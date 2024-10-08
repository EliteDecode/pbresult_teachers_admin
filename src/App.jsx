import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import Login from "./pages/auth/Login";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import AddStudentPage from "./pages/dashboard/Students/AddStudentPage";
import EditStudentsPage from "./pages/dashboard/Students/EditStudentsPage";
import SingleStudent from "./pages/dashboard/Students/SingleStudent";
import StudentsPage from "./pages/dashboard/Students/StudentsPage";
import DashboardSettingsPage from "./pages/dashboard/settings/DashboardSettingsPage";
import Page404 from "./pages/notFound/Page404";

import Profile from "./pages/dashboard/DashboardProfilePage";
import AddStudentResult from "./pages/dashboard/results/AddStudentResult";
import ResultBroadsheet from "./pages/dashboard/results/ResultBroadsheet";
import SingleStudentResult from "./pages/dashboard/results/SingleStudentResult";
import SingleStudentResultBroadsheet from "./pages/dashboard/results/SingleStudentResultBroadsheet";
import StudentResult from "./pages/dashboard/results/StudentResult";
import ViewStudentPerSubjectResult from "./pages/dashboard/results/ViewStudentPerSubjectResult";
import ChangePassword from "./pages/dashboard/settings/ChangePassword";

// routes

export default function App() {
  const { user, token } = useSelector((state) => state.pbTeachersAuth);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          element: !token ? <Navigate to="/login" /> : <DashboardLayout />,
          path: "/dashboard",
          children: [
            { element: <Navigate to="/dashboard/home" />, index: true },
            {
              path: "home",
              element: <DashboardHomePage />,
            },

            {
              path: "students",
              element: <StudentsPage />,
            },

            {
              path: "students/add-student",
              element: <AddStudentPage />,
            },
            {
              path: "students/edit-student/:studentId",
              element: <EditStudentsPage />,
            },
            {
              path: "students/:studentId",
              element: <SingleStudent />,
            },

            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "results/:termId/:subjectId/:classId",
              element: <AddStudentResult />,
            },

            {
              path: "results/view/:termId/:subjectId/:classId",
              element: <ViewStudentPerSubjectResult />,
            },
            {
              path: "results/single/:termId/:studentId/:subjectId",
              element: <SingleStudentResult />,
            },
            {
              path: "results",
              element: <StudentResult />,
            },

            {
              path: "settings",
              element: <DashboardSettingsPage />,
            },
            {
              path: "changePassword",
              element: <ChangePassword />,
            },
          ],
        },
        {
          path: "/dashboard/result/broadsheet",
          element: !token ? <Navigate to="/login" /> : <ResultBroadsheet />,
        },
        {
          path: "/dashboard/students/result/:studentId/:sessionId/:classId",
          element: !token ? (
            <Navigate to="/login" />
          ) : (
            <SingleStudentResultBroadsheet />
          ),
        },

        {
          path: "/login",
          element: <Login />,
        },
        { path: "/404", element: <Page404 /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ])}
    />
  );
}
