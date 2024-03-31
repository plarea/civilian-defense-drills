import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import drillRoutes from "./drills/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      drillRoutes,
      {
        path: "courses",
        lazy: () => import("./courses/Router"),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
