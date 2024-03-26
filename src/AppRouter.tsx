import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
