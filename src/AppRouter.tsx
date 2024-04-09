import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import drillRoutes from "./drills/routes";
import historyRoutes from "./history/routes";
import Home from "./HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }, drillRoutes, historyRoutes],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
