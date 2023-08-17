import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import ComplaintPage from "./pages/ComplaintPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Page404 from "./pages/Page404";
import OutingsPage from "./pages/OutingsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import NonRequiredAuth from "./components/common/NonRequiredAuth";
import { useEffect } from "react";
import { systemLanguages } from "./store/userSlice";
import { useDispatch } from "react-redux";
// ----------------------------------------------------------------------

export default function Router({ setTheme, theme }) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchLanguages() {
      try {
        await systemLanguages()(dispatch);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    }

    fetchLanguages();
  }, []);
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout setTheme={setTheme} applicationTheme={theme} />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "complaints", element: <ComplaintPage /> },
        { path: "user", element: <UserPage /> },
        { path: "outings", element: <OutingsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: "/",
      element: <NonRequiredAuth />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
