import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "drills",
        lazy: async () => {
          const { Layout } = await import("./drills");
          return { Component: Layout };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { DrillsList } = await import("./drills");
              return { Component: DrillsList };
            },
          },
          {
            path: 'create',
            lazy: async () => {
              const { DrillsForm } = await import("./drills");
              return { Component: DrillsForm };
            },
          },
        ],
      },
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
