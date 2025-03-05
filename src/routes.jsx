import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import MealLog from "./pages/MealLog";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* {
        index: true,
        element: <Navigate to="dashboard" />,
      }, */
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mealLog",
        element: <MealLog />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
