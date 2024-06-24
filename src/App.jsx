import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import DashboardSettingsPage from "./pages/dashboard/settings/DashboardSettingsPage";
import Page404 from "./pages/notFound/Page404";
import StudentsPage from "./pages/dashboard/Students/StudentsPage";
import AddStudentPage from "./pages/dashboard/Students/AddStudentPage";
import EditStudentsPage from "./pages/dashboard/Students/EditStudentsPage";
import SingleStudent from "./pages/dashboard/Students/SingleStudent";
import { useSelector } from "react-redux";

import StudentsClassPage from "./pages/dashboard/Students/StudentsClassPage";
import ChangePassword from "./pages/dashboard/settings/ChangePassword";
import Profile from "./pages/dashboard/DashboardProfilePage";
import StudentResult from "./pages/dashboard/results/StudentResult";
import AddStudentResult from "./pages/dashboard/results/AddStudentResult";
import SingleStudentResult from "./pages/dashboard/results/SingleStudentResult";
import ViewStudentPerSubjectResult from "./pages/dashboard/results/ViewStudentPerSubjectResult";
import ResultBroadsheet from "./pages/dashboard/results/ResultBroadsheet";

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
